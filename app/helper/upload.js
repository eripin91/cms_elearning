/* global CONFIG */

'use strict'

const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const path = require('path')

aws.config.update({
  secretAccessKey: CONFIG.AWS.AWS_ACCESS_KEY_SECRET,
  accessKeyId: CONFIG.AWS.AWS_ACCESS_KEY_ID,
  region: CONFIG.AWS_S3_REGION
})

const s3 = new aws.S3()

const uploadAws = multer({
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'developmentarkadmi',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: 'TESTING_METADATA' })
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + path.extname(file.originalname))
    }
  })
})

module.exports = uploadAws
// const singleUpload = uploadAws.single('file')

// exports.upload = (req, res) => {
//   singleUpload(req, res, (err) => {
//     if (err) {
//       return MiscHelper.errorCustomStatus(res, err)
//     } else {
//       return req.file.location
//     }
//   })
// }
