/* global _ redisCache */

'use strict'

const async = require('async')
const classesModel = require('../../models/classes')

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

  const key = `get-class-${req.params.classId}` + new Date().getTime()

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
  req.checkBody('guruId', 'guruId is required').notEmpty().isInt()
  req.checkBody('name', 'name is required').notEmpty()
  req.checkBody('description', 'description is required').notEmpty()
  req.checkBody('cover', 'cover is required').notEmpty()
  req.checkBody('medium', 'medium is required').notEmpty()
  req.checkBody('thumbnail', 'thumbnail is required').notEmpty()
  req.checkBody('priority', 'priority is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (dataFile, cb) => {
      const data = {
        guruid: req.body.guruId,
        name: req.body.name,
        description: req.body.description,
        cover: req.body.cover,
        medium: req.body.medium,
        thumbnail: req.body.thumbnail,
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
