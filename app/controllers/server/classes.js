/* global _ redisCache */

'use strict'

const async = require('async')
const classesModel = require('../../models/classes')
const uploadAws = require('../../helper/upload')
const aws = require('aws-sdk')
const gm = require('gm').subClass({ imageMagick: true })
const s3 = new aws.S3()

exports.get = (req, res) => {
  const key = 'get-all-class'

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
      classesModel.get(req, (errClass, resultClass) => {
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

exports.insertClass = (req, res) => {
  req.checkBody('guruId', 'guruId is required').notEmpty().isInt()
  req.checkBody('name', 'name is required').notEmpty()
  req.checkBody('description', 'description is required').notEmpty()
  req.checkBody('cover', 'cover is required').notEmpty()
  req.checkBody('priority', 'priority is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const data = {
    guruid: req.body.guruId,
    name: req.body.name,
    description: req.body.description,
    cover: req.body.cover,
    priority: req.body.priority,
    rating: 0,
    status: 1,
    created_at: new Date(),
    updated_at: new Date()
  }

  classesModel.insertClass(req, data, (errInsert, resultInsert) => {
    if (!errInsert) {
      redisCache.del('get-all-class')
      return MiscHelper.responses(res, resultInsert)
    } else {
      return MiscHelper.errorCustomStatus(res, errInsert, 400)
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
          cb(null)
        }
      })
    },
    (cb) => {
      let data = {
        updated_at: new Date()
      }

      for (let key in req.body) {
        data[key] = req.body[key]
      }

      classesModel.updateClass(req, data, req.params.classId, (err, result) => {
        redisCache.del(`get-class-${req.params.classId}`)
        redisCache.del(`get-all-class`)
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
      redisCache.del(`get-class-${req.params.classId}`)
      redisCache.del(`get-all-class`)
      return MiscHelper.responses(res, result)
    } else {
      return MiscHelper.errorCustomStatus(res, err)
    }
  })
}

exports.upload = (req, res) => {
  const singleUpload = uploadAws.single('file')
  singleUpload(req, res, (err) => {
    if (err) {
      return MiscHelper.errorCustomStatus(res, err)
    } else {
      return MiscHelper.responses(res, req.file)
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

  const singleUpload = uploadAws.single('file')

  async.waterfall([
    (cb) => {
      singleUpload(req, res, (err) => {
        if (!err) {
          cb(null, req.file)
        } else {
          return MiscHelper.errorCustomStatus(res, err)
        }
      })
    },
    (dataImage, cb) => {
      let getParams = {
        Bucket: dataImage.bucket,
        Key: dataImage.key
      }

      s3.getObject(getParams, (err, image) => {
        // console.log(image)
        // cb(null, dataImage)
        if (err) console.error(err)

        gm(image.Body)
          .resize(120, 120)
          .stream((err, stdout, stderr) => {
            if (err) console.error(err)

            stdout.pipe(res)
            console.log(res)
          })
      })
    },
    (dataFile, cb) => {
      const data = {
        guruid: req.body.guruId,
        name: req.body.name,
        description: req.body.description,
        cover: dataFile.location,
        priority: req.body.priority,
        rating: 0,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }

      classesModel.insertClass(req, data, (err, result) => {
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
