// 'use strict'

// const AWS = require('aws-sdk')
// const Busboy = require('busboy')

// const BUCKET_NAME = 'elearning'
// const USER_KEY = CONFIG.AWS_ACCESS_KEY_ID
// const SECRET_KEY = CONFIG.AWS_ACCESS_KEY_SECRET

// uploadToS3(file => {
//   let s3bucket = new AWS.S3({
//     accessKeyId: USER_KEY,
//     secretAccessKey: SECRET_KEY,
//     bucket: BUCKET_NAME
//   })

//   s3bucket.createBucket(() => {
//     const params = {
//       bucket: BUCKET_NAME,
//       Key: file.name,
//       Body: file.data
//     }
//     s3bucket.upload(params, (err, data) => {
//       if (err) {
//         console.log('error in callback')
//         console.log('err')
//       } else {
//         console.log('success')
//         console.log(data)
//       }
//     })
//   })
// })
