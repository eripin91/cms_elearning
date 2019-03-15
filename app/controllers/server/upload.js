const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const s3Config = new AWS.S3({
  accessKeyId: CONFIG.AWS.AWS_ACCESS_KEY_ID,
  secretAccessKey: CONFIG.AWS.AWS_ACCESS_KEY_SECRET,
  region: CONFIG.AWS.AWS_REGION,
  Bucket: 'developmentarkadmi'
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const multerS3Config = multerS3({
  s3: s3Config,
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
