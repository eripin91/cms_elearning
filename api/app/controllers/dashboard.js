/* global _ */

'use strict'

const async = require('async')
const dashboardModel = require('../models/dashboard')
const redisCache = require('../libs/RedisCache')

exports.get = (req, res) => {
  req.checkParams('userId', 'userId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(req, req.validationErrors(true))
  }

  const key = `get-dashboard:${req.params.userId}:${new Date().getTime}` // disabled cache
  async.waterfall([
    (cb) => {
      redisCache.get(key, users => {
        if (users) {
          return MiscHelper.responses(res, users)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      dashboardModel.getUserClass(req, req.params.userId, (errClass, resultClass) => {
        let data = {}
        data.user_class = resultClass.length
        cb(errClass, data)
      })
    },
    (data, cb) => {
      dashboardModel.getUserClassLimit(req, req.params.userId, (errClass, resultClass) => {
        if (resultClass === undefined) {
          data.user_classes_list = 'Anda Belum Mendaftar Kelas'
        } else {
          data.user_classes_list = resultClass
        }
        cb(errClass, data)
      })
    },
    (data, cb) => {
      let err
      data.user_classes_list.map((item) => {
        dashboardModel.getUserClassProgress(req, req.params.userId, item.classid, (errClass, resultClass) => {
          err = errClass
          item.course_done = resultClass[0].progress_bab
          item.courses = resultClass[0].all_bab
        })
      })
      cb(err, data)
    },
    (data, cb) => {
      dashboardModel.getClass(req, (errClass, resultClass) => {
        if (resultClass === undefined) {
          data.recent_class = 0
        } else {
          data.recent_class = resultClass.length
        }
        cb(errClass, data)
      })
    },
    (data, cb) => {
      dashboardModel.getClassLimit(req, (errClass, resultClass) => {
        if (resultClass === undefined) {
          data.recent_class_list = []
        } else {
          data.recent_class_list = resultClass
        }
        cb(errClass, data)
      })
    },
    (data, cb) => {
      dashboardModel.getClassRecomendation(req, (errClass, resultClass) => {
        if (resultClass.length === 0) {
          data.recomendation_class = 0
        } else {
          data.recomendation_class = resultClass.length
        }
        cb(errClass, data)
      })
    },
    (data, cb) => {
      dashboardModel.getClassRecomendationLimit(req, (errClass, resultClass) => {
        if (resultClass.length === 0) {
          data.recomendation_class_list = []
        } else {
          data.recomendation_class_list = resultClass
        }
        cb(errClass, data)
      })
    },
    (data, cb) => {
      async.eachSeries(data.recomendation_class_list, (item, next) => {
        dashboardModel.getDetailCount(req, item.classid, (err, result) => {
          if (err) console.error(err)
          result.map((total) => {
            item.courses = total.total_bab
          })
          next()
        })
      }, err => {
        cb(err, data)
      })
    },
    (data, cb) => {
      async.eachSeries(data.recomendation_class_list, (item, next) => {
        dashboardModel.getDurationCount(req, item.classid, (err, result) => {
          if (err) console.error(err)
          result.map((total) => {
            let minutes = Math.floor(total.total_durasi / 60)
            let second = total.total_durasi - (minutes * 60)
            total.total_durasi = minutes + ':' + second
            item.durasi = total.total_durasi
          })
          next()
        })
      }, err => {
        redisCache.setex(key, 81600, data)
        cb(err, data)
      })
    }
  ], (errClass, resultClass) => {
    if (!errClass) {
      return MiscHelper.responses(res, resultClass)
    } else {
      return MiscHelper.errorCustomStatus(res, errClass, 400)
    }
  })
}
