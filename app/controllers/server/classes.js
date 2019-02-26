/* global _ redisCache */

'use strict'

const async = require('async')
const classesModel = require('../../models/classes')

exports.get = (req, res) => {
  const key = 'get-class'

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
