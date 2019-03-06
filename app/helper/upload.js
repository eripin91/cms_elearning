const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const path = require('path')

aws.config.update({
  secretAccessKey: 'jJIv54M7M3J3u06NEPloVOCLdrNSYl+6gru6+X1G',
  accessKeyId: 'AKIAJ43IZ2UQPJLS25PA',
  region: 'ap-southeast-1'
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
