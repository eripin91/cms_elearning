/* global _ redisCache */

'use strict'

const async = require('async')
const classesModel = require('../../models/classes')
const fs = require('fs')
const aws = require('aws-sdk')
const gm = require('gm').subClass({ imageMagick: true })

aws.config.update({
  secretAccessKey: CONFIG.AWS.AWS_ACCESS_KEY_SECRET,
  accessKeyId: CONFIG.AWS.AWS_ACCESS_KEY_ID,
  region: CONFIG.AWS_REGION
})

const s3 = new aws.S3()

exports.get = (req, res) => {
  const limit = _.result(req.query, 'limit', 10)
  const offset = _.result(req.query, 'offset', 0)
  const keyword = _.result(req.query, 'keyword', '')

  const key = `get-class-all-${limit}-${offset}-${keyword}`

  async.waterfall([
    (cb) => {
      redisCache.get(key, classes => {
        if (_.result(classes, 'data')) {
          return MiscHelper.responses(res, classes.data, 200, { total: classes.total })
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      classesModel.get(req, limit, offset, keyword, (errClass, classes) => {
        cb(errClass, classes)
      })
    },
    (classes, cb) => {
      classesModel.getTotalClass(req, keyword, (errClass, total) => {
        const resultClass = {
          data: classes,
          total: total[0].total
        }
        cb(errClass, resultClass)
      })
    },
    (dataClass, cb) => {
      redisCache.setex(key, 100, dataClass)
      cb(null, dataClass)
    }
  ], (errClass, resultClass) => {
    if (!errClass) {
      return MiscHelper.responses(res, resultClass.data, 200, { total: resultClass.total })
    } else {
      return MiscHelper.errorCustomStatus(res, errClass, 400)
    }
  })
}

exports.getAllClass = (req, res) => {
  const key = `get-class-all-`

  async.waterfall([
    (cb) => {
      redisCache.get(key, classes => {
        if (classes) {
          return MiscHelper.responses(res, classes)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      classesModel.getAllClass(req, (errClass, resultClass) => {
        cb(errClass, resultClass)
      })
    },
    (dataClass, cb) => {
      redisCache.setex(key, 600, dataClass)
      cb(null, dataClass)
    }
  ], (errClass, resultClass) => {
    if (!errClass) {
      return MiscHelper.responses(res, resultClass)
    } else {
      return MiscHelper.errorCustomStatus(res, errClass, 400)
    }
  })
}

exports.getDetail = (req, res) => {
  req.checkParams('classId', 'classId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const key = `get-class-${req.params.classId}`

  async.waterfall([
    (cb) => {
      redisCache.get(key, classes => {
        if (classes) {
          return MiscHelper.responses(res, classes)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      classesModel.getDetail(req, req.params.classId, (errClass, resultClass) => {
        cb(errClass, resultClass)
      })
    },
    (dataClass, cb) => {
      redisCache.setex(key, 100, dataClass)
      cb(null, dataClass)
    }
  ], (errClass, resultClass) => {
    if (!errClass) {
      return MiscHelper.responses(res, resultClass)
    } else {
      return MiscHelper.errorCustomStatus(res, errClass, 400)
    }
  })
}

exports.updateClass = (req, res) => {
  req.checkParams('classId', 'classId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      classesModel.checkClass(req, req.params.classId, (errCheck, resultCheck) => {
        if (_.isEmpty(resultCheck) || errCheck) {
          return MiscHelper.errorCustomStatus(res, { message: 'Class isn\'t Exist' })
        } else {
          cb(null, resultCheck[0])
        }
      })
    },
    (dataClass, cb) => {
      const guruId = _.result(req.body, 'guruId', dataClass.guruid)
      const name = _.result(req.body, 'name', dataClass.name)
      const description = _.result(req.body, 'description', dataClass.description)
      const priority = _.result(req.body, 'priority', dataClass.priority)

      if (_.result(req.file, 'key')) {
        const data = _.assign({}, dataClass, req.file)
        cb(null, data)
      } else {
        const data = {
          guruid: guruId,
          name: name,
          description: description,
          priority: priority,
          updated_at: new Date()
        }

        classesModel.updateClass(req, data, req.params.classId, (err, result) => {
          redisCache.delwild(`get-class-*`)
          if (!err) {
            return MiscHelper.responses(res, result)
          } else {
            return MiscHelper.errorCustomStatus(res, err, 400)
          }
        })
      }
    },
    (dataClass, cb) => {
      let getParams = {
        Bucket: dataClass.bucket,
        Key: dataClass.key
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
                    Bucket: dataClass.bucket,
                    Key: `medium-${dataClass.key}`,
                    Body: base64Data,
                    ACL: 'public-read'
                  }

                  s3.upload(params, (err, result) => {
                    if (!err) {
                      fs.unlinkSync(filePath)
                      dataClass.mediumEdit = result.Location
                      cb(null, dataClass)
                    }
                  })
                }
              })
            }
          })
      })
    },
    (dataClass, cb) => {
      let getParams = {
        Bucket: dataClass.bucket,
        Key: dataClass.key
      }

      s3.getObject(getParams, (err, image) => {
        if (err) console.error(err)

        gm(image.Body)
          .resize(120, 120, '^')
          .gravity('Center')
          .crop(120, 120)
          .write(`./assets/img/thumbnail-${getParams.Key}`, (err) => {
            if (!err) {
              const filePath = `./assets/img/thumbnail-${getParams.Key}`

              fs.readFile(filePath, (err, data) => {
                if (!err) {
                  let base64Data = Buffer.from(data, 'binary')
                  let params = {
                    Bucket: dataClass.bucket,
                    Key: `thumbnail-${dataClass.key}`,
                    Body: base64Data,
                    ACL: 'public-read'
                  }

                  s3.upload(params, (err, result) => {
                    if (!err) {
                      fs.unlinkSync(filePath)
                      dataClass.thumbnailEdit = result.Location
                      cb(null, dataClass)
                    }
                  })
                }
              })
            }
          })
      })
    },
    (dataClass, cb) => {
      const guruId = _.result(req.body, 'guruId', dataClass.guruid)
      const name = _.result(req.body, 'name', dataClass.name)
      const description = _.result(req.body, 'description', dataClass.description)
      const priority = _.result(req.body, 'priority', dataClass.priority)

      const data = {
        guruid: guruId,
        name: name,
        description: description,
        cover: dataClass.location,
        medium: dataClass.mediumEdit,
        thumbnail: dataClass.thumbnailEdit,
        priority: priority,
        updated_at: new Date()
      }

      classesModel.updateClass(req, data, req.params.classId, (err, result) => {
        redisCache.delwild(`get-class-*`)
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

exports.deleteClass = (req, res) => {
  req.checkParams('classId', 'classId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  classesModel.deleteClass(req, req.params.classId, (err, result) => {
    if (!err) {
      redisCache.delwild(`get-class-*`)
      return MiscHelper.responses(res, result)
    } else {
      return MiscHelper.errorCustomStatus(res, err)
    }
  })
}

exports.insertClassUltimate = (req, res) => {
  // req.checkBody('guruId', 'guruId is required').notEmpty().isInt()
  // req.checkBody('name', 'name is required').notEmpty()
  // req.checkBody('description', 'description is required').notEmpty()
  // req.checkBody('file', 'file is required').notEmpty()
  // req.checkBody('priority', 'priority is required').notEmpty().isInt()

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
        guruid: req.body.guruId,
        name: req.body.name,
        description: req.body.description,
        cover: dataFile.location,
        medium: dataFile.medium,
        thumbnail: dataFile.thumbnail,
        priority: req.body.priority,
        rating: 0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }

      classesModel.insertClass(req, data, (err, result) => {
        redisCache.delwild(`get-class-*`)
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
