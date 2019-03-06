/* global CONFIG */

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

const upload = multer({
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

module.exports = upload
