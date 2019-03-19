/* global _ redisCache */

'use strict'

const async = require('async')
const guruModel = require('../../models/guru')
const fs = require('fs')
const aws = require('aws-sdk')
const gm = require('gm').subClass({ imageMagick: true })

aws.config.update({
  secretAccessKey: CONFIG.AWS.AWS_ACCESS_KEY_SECRET,
  accessKeyId: CONFIG.AWS.AWS_ACCESS_KEY_ID,
  region: CONFIG.AWS_REGION
})

const s3 = new aws.S3()

/*
 * GET : '/guru/get'
 *
 * @desc Get all guru
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */

exports.get = (req, res) => {
  const limit = _.result(req.query, 'limit', 10)
  const offset = _.result(req.query, 'offset', 0)
  const keyword = _.result(req.query, 'keyword', '')

  const key = `get-guru-list-${limit}-${offset}-${keyword}`

  async.waterfall([
    (cb) => {
      redisCache.get(key, guru => {
        if (_.result(guru, 'data')) {
          return MiscHelper.responses(res, guru.data, 200, { total: guru.total })
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      guruModel.get(req, limit, offset, keyword, (errGuru, resultGuru) => {
        cb(errGuru, resultGuru)
      })
    },
    (dataGuru, cb) => {
      guruModel.getTotalGuru(req, keyword, (errGuru, total) => {
        const resultGuru = {
          data: dataGuru,
          total: total[0].total
        }
        cb(errGuru, resultGuru)
      })
    },
    (dataGuru, cb) => {
      redisCache.setex(key, 100, dataGuru)
      cb(null, dataGuru)
    }
  ], (errGuru, resultGuru) => {
    if (!errGuru) {
      return MiscHelper.responses(res, resultGuru.data, 200, { total: resultGuru.total })
    } else {
      return MiscHelper.errorCustomStatus(res, errGuru, 400)
    }
  })
}

/*
 * GET : '/guru/get/:guruId'
 *
 * @desc Get guru
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.params.guruId - Id guru master
 *
 * @return {object} Request object
 */

exports.getDetail = (req, res) => {
  req.checkParams('guruId', 'guruId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const key = `get-guru-${req.params.guruId}`

  async.waterfall([
    (cb) => {
      redisCache.get(key, guruDetail => {
        if (guruDetail) {
          return MiscHelper.responses(res, guruDetail)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      guruModel.checkDetailGuru(req, req.params.guruId, (errGuru, resultGuru) => {
        cb(errGuru, resultGuru[0])
      })
    },
    (dataGuru, cb) => {
      redisCache.setex(key, 100, dataGuru)
      cb(null, dataGuru)
    }
  ], (errGuru, resultGuru) => {
    if (!errGuru) {
      return MiscHelper.responses(res, resultGuru)
    } else {
      return MiscHelper.errorCustomStatus(res, errGuru)
    }
  })
}

/*
 * PUT : '/update/:guruId
 *
 * @desc Update guru detail
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.params.guruId - Id guru master
 *
 * @body  {object} req - body for request
 * @body  {objectId} req.body.fullname - Guru fullname
 * @body  {objectId} req.body.profile_picture - Guru picture
 * @body  {objectId} req.body.description - Guru description
 *
 * @return {object} Request object
 */

// exports.updateGuru = (req, res) => {
//   req.checkParams('guruId', 'guruId is required').notEmpty().isInt()

//   if (req.validationErrors()) {
//     return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
//   }

//   async.waterfall([
//     (cb) => {
//       guruModel.checkDetailGuru(req, req.params.guruId, (errCheck, resultCheck) => {
//         if (_.isEmpty(resultCheck) || errCheck) {
//           return MiscHelper.errorCustomStatus(res, { message: 'Guru isn\'t Exist' })
//         } else {
//           cb(null)
//         }
//       })
//     },
//     (cb) => {
//       let data = {
//         updated_at: new Date()
//       }

//       for (let key in req.body) {
//         data[key] = req.body[key]
//       }

//       guruModel.updateGuru(req, data, req.params.guruId, (err, result) => {
//         redisCache.delwild(`get-guru-*`)
//         cb(err, result)
//       })
//     }
//   ], (errUpdate, resultUpdate) => {
//     if (!errUpdate) {
//       return MiscHelper.responses(res, resultUpdate)
//     } else {
//       return MiscHelper.errorCustomStatus(res, errUpdate)
//     }
//   })
// }

/*
 * DEL : '/delete/:guruId'
 *
 * @desc Delete guru
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.params.guruId - Id guru master
 *
 * @return {object} Request object
 */

exports.deleteGuru = (req, res) => {
  req.checkParams('guruId', 'guruId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  guruModel.deleteGuru(req, req.params.guruId, (err, result) => {
    if (!err) {
      redisCache.delwild(`get-guru-*`)
      return MiscHelper.responses(res, result)
    } else {
      return MiscHelper.errorCustomStatus(res, err)
    }
  })
}

/*
 * POST : '/add
 *
 * @desc Post guru detail
 *
 * @body  {object} req - body for request
 * @body  {objectId} req.body.fullname - Guru fullname
 * @body  {objectId} req.body.file - Guru picture
 * @body  {objectId} req.body.description - Guru description
 *
 * @return {object} Request object
 */

exports.insertGuru = (req, res) => {
  // req.checkBody('fullname', 'fullname is required').notEmpty()
  // req.checkBody('description', 'description is required').notEmpty()
  // req.checkBody('file', 'file is required').notEmpty()

  // if (req.validationErrors()) {
  //   return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  // }

  async.waterfall([
    (cb) => {
      if (!_.result(req.file, 'key')) {
        return MiscHelper.errorCustomStatus(res, 'Invalid file upload.', 400)
      } else {
        cb(null, req.file)
      }
    },
    (dataImage, cb) => {
      let getParams = {
        Bucket: dataImage.bucket,
        Key: dataImage.key
      }

      s3.getObject(getParams, (err, image) => {
        if (err) console.error(err)

        gm(image.Body)
          .resize(120, 120, '^')
          .gravity('Center')
          .crop(120, 120)
          // .stream((err, stdout, stderr) => {
          //   stdout.pipe(res)
          // })
          .write(`./assets/img/thumbnail-${getParams.Key}`, (err) => {
            if (!err) {
              const filePath = `./assets/img/thumbnail-${getParams.Key}`

              fs.readFile(filePath, (err, data) => {
                if (!err) {
                  let base64Data = Buffer.from(data, 'binary')
                  let params = {
                    Bucket: dataImage.bucket,
                    Key: `thumbnail-${dataImage.key}`,
                    Body: base64Data,
                    ACL: 'public-read'
                  }

                  s3.upload(params, (err, result) => {
                    if (!err) {
                      fs.unlinkSync(filePath)
                      dataImage.thumbnail = result.Location
                      cb(null, dataImage)
                    }
                  })
                }
              })
            }
          })
      })
    },
    (dataImage, cb) => {
      let getParams = {
        Bucket: dataImage.bucket,
        Key: dataImage.key
      }

      s3.getObject(getParams, (err, image) => {
        if (err) console.error(err)

        gm(image.Body)
          .resize(500, 500, '^')
          .gravity('Center')
          .crop(500, 500)
          .write(`./assets/img/medium-${getParams.Key}`, (err) => {
            if (!err) {
              const filePath = `./assets/img/medium-${getParams.Key}`

              fs.readFile(filePath, (err, data) => {
                if (!err) {
                  let base64Data = Buffer.from(data, 'binary')
                  let params = {
                    Bucket: dataImage.bucket,
                    Key: `medium-${dataImage.key}`,
                    Body: base64Data,
                    ACL: 'public-read'
                  }

                  s3.upload(params, (err, result) => {
                    if (!err) {
                      fs.unlinkSync(filePath)
                      dataImage.medium = result.Location
                      cb(null, dataImage)
                    }
                  })
                }
              })
            }
          })
      })
    },
    (dataFile, cb) => {
      console.log(dataFile)
      const data = {
        fullname: req.body.fullname,
        profile_picture: dataFile.location,
        medium: dataFile.medium,
        thumbnail: dataFile.thumbnail,
        description: req.body.description,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }

      guruModel.insertGuru(req, data, (err, result) => {
        redisCache.delwild(`get-guru-*`)
        cb(err, result)
      })
    }
  ], (errInsert, resultInsert) => {
    if (!errInsert) {
      return MiscHelper.responses(res, resultInsert)
    } else {
      return MiscHelper.errorCustomStatus(res, errInsert)
    }
  })
}

exports.updateGuru = (req, res) => {
  req.checkParams('guruId', 'guruId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      guruModel.checkDetailGuru(req, req.params.guruId, (errCheck, resultCheck) => {
        if (_.isEmpty(resultCheck) || errCheck) {
          return MiscHelper.errorCustomStatus(res, { message: 'Class isn\'t Exist' })
        } else {
          cb(null, resultCheck[0])
        }
      })
    },
    (dataGuru, cb) => {
      const fullname = _.result(req.body, 'name', dataGuru.fullname)
      const description = _.result(req.body, 'description', dataGuru.description)

      if (_.result(req.file, 'key')) {
        const data = _.assign({}, dataGuru, req.file)
        cb(null, data)
      } else {
        const data = {
          fullname: fullname,
          description: description,
          updated_at: new Date()
        }

        guruModel.updateGuru(req, data, req.params.guruId, (err, result) => {
          redisCache.delwild(`get-guru-*`)
          if (!err) {
            return MiscHelper.responses(res, result)
          } else {
            return MiscHelper.errorCustomStatus(res, err, 400)
          }
        })
      }
    },
    (dataGuru, cb) => {
      let getParams = {
        Bucket: dataGuru.bucket,
        Key: dataGuru.key
      }

      s3.getObject(getParams, (err, image) => {
        if (err) console.error(err)

        gm(image.Body)
          .resize(500, 500, '^')
          .gravity('Center')
          .crop(500, 500)
          .write(`./assets/img/medium-${getParams.Key}`, (err) => {
            if (!err) {
              const filePath = `./assets/img/medium-${getParams.Key}`

              fs.readFile(filePath, (err, data) => {
                if (!err) {
                  let base64Data = Buffer.from(data, 'binary')
                  let params = {
                    Bucket: dataGuru.bucket,
                    Key: `medium-${dataGuru.key}`,
                    Body: base64Data,
                    ACL: 'public-read'
                  }

                  s3.upload(params, (err, result) => {
                    if (!err) {
                      fs.unlinkSync(filePath)
                      dataGuru.mediumEdit = result.Location
                      cb(null, dataGuru)
                    }
                  })
                }
              })
            }
          })
      })
    },
    (dataGuru, cb) => {
      let getParams = {
        Bucket: dataGuru.bucket,
        Key: dataGuru.key
      }

      s3.getObject(getParams, (err, image) => {
        if (err) console.error(err)

        gm(image.Body)
          .resize(120, 120, '^')
          .gravity('Center')
          .crop(120, 120)
          .write(`./assets/img/medium-${getParams.Key}`, (err) => {
            if (!err) {
              const filePath = `./assets/img/medium-${getParams.Key}`

              fs.readFile(filePath, (err, data) => {
                if (!err) {
                  let base64Data = Buffer.from(data, 'binary')
                  let params = {
                    Bucket: dataGuru.bucket,
                    Key: `medium-${dataGuru.key}`,
                    Body: base64Data,
                    ACL: 'public-read'
                  }

                  s3.upload(params, (err, result) => {
                    if (!err) {
                      fs.unlinkSync(filePath)
                      dataGuru.thumbnailEdit = result.Location
                      cb(null, dataGuru)
                    }
                  })
                }
              })
            }
          })
      })
    },
    (dataGuru, cb) => {
      const fullname = _.result(req.body, 'fullname', dataGuru.fullname)
      const description = _.result(req.body, 'description', dataGuru.description)

      const data = {
        fullname: fullname,
        description: description,
        profile_picture: dataGuru.location,
        medium: dataGuru.mediumEdit,
        thumbnail: dataGuru.thumbnailEdit,
        updated_at: new Date()
      }

      guruModel.updateGuru(req, data, req.params.guruId, (err, result) => {
        redisCache.delwild(`get-guru-*`)
        cb(err, result)
      })
    }
  ], (errUpdate, resultUpdate) => {
    if (!errUpdate) {
      return MiscHelper.responses(res, resultUpdate)
    } else {
      return MiscHelper.errorCustomStatus(res, errUpdate)
    }
  })
}
