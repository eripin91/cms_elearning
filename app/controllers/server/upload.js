/* global _ helpers CONFIG */

'use strict'

const async = require('async')
const ffmpeg = require('fluent-ffmpeg')
const uploadCk = require('../../helper/upload')
const singleUpload = uploadCk.single('file')
const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const fs = require('fs')

AWS.config.update({
  secretAccessKey: CONFIG.AWS.AWS_ACCESS_KEY_SECRET,
  accessKeyId: CONFIG.AWS.AWS_ACCESS_KEY_ID,
  region: CONFIG.AWS.AWS_REGION
})

const s3 = new AWS.S3()

exports.uploadAws = (req, res, next) => {
  async.waterfall([
    (cb) => {
      singleUpload(req, res, (err) => {
        if (!_.result(req.file, 'key')) {
          req.dataUpload = undefined
          next()
        } else {
          if (err) {
            return MiscHelper.errorCustomStatus(res, err, 400)
          } else {
            let data = {
              key: req.file.key,
              fileUrl: req.file.location,
              size: req.file.size
            }
            console.log('file uploaded')
            cb(null, data)
          }
        }
      })
    },
    (dataUpload, cb) => {
      ffmpeg(dataUpload.fileUrl)
        .input(dataUpload.fileUrl)
        .ffprobe((err, data) => {
          if (err) console.error(err)
          dataUpload.duration = parseInt(data.streams[0].duration)
          cb(err, dataUpload)
        })
    },
    (dataUpload, cb) => {
      if (_.isEmpty(dataUpload)) {
        return MiscHelper.errorCustomStatus('Tidak ada file upload')
      } else {
        dataUpload.thumbnail = dataUpload.key + 'screenshot.jpg'
        ffmpeg(dataUpload.fileUrl)
          .takeScreenshots({
            count: 1,
            timemarks: ['5'],
            filename: dataUpload.thumbnail,
            folder: './assets/img'
          })
          .on('end', () => {
            const filePath = './assets/img/' + dataUpload.thumbnail
            const bucketName = 'developmentarkadmi'
            const key = dataUpload.thumbnail

            fs.readFile(filePath, (err, data) => {
              if (err) console.error(err)
              var base64Data = Buffer.from(data, 'binary')
              var params = {
                Bucket: bucketName,
                Key: key,
                Body: base64Data,
                ACL: 'public-read'
              }
              s3.upload(params, (err, result) => {
                if (err) console.error(err)
                fs.unlinkSync('./assets/img/' + dataUpload.thumbnail)
                dataUpload.thumbnail = result.Location
                cb(err, dataUpload)
              })
            })
          })
      }
    }
  ],
  (errUpload, dataUpload) => {
    if (!errUpload) {
      req.dataUpload = dataUpload
      next()
    } else {
      return MiscHelper.errorCustomStatus(res, errUpload, 400)
    }
  })
}

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const multerS3Config = multerS3({
  s3: s3,
  bucket: 'developmentarkadmi',
  acl: 'public-read',
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname })
  },
  key: function (req, file, cb) {
    cb(null, new Date().getTime() + '-' + file.originalname.replace(/\s/g, '-'))
  }
})

const upload = multer({
  storage: multerS3Config,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 2 // we are allowing only 2 MB files
  }
})

exports.upload = upload