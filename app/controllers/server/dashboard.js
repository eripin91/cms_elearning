/* global _ helpers */

'use strict'

const async = require('async')
const dashboardModel = require('../../models/dashboard')
const redisCache = require('../../libs/RedisCache')

exports.get = (req, res) => {
  const key = `get-dashboard`

  async.waterfall([
    (cb) => {
      redisCache.get(key, dashboard => {
        if (dashboard) {
          return MiscHelper.responses(res, dashboard)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      dashboardModel.getUsers(req, (errUser, resultUser) => {
        let data = {}
        if (_.isEmpty(resultUser)) {
          data.user = 0
        } else {
          data.user = resultUser[0].user
        }
        cb(errUser, data)
      })
    },
    (data, cb) => {
      dashboardModel.getClass(req, (errClass, resultClass) => {
        if (_.isEmpty(resultClass)) {
          data.class = 0
        } else {
          data.class = resultClass[0].class
        }
        cb(errClass, data)
      })
    },
    (data, cb) => {
      dashboardModel.getCourses(req, (errCourse, resultCourse) => {
        if (_.isEmpty(resultCourse)) {
          data.course = 0
        } else {
          data.course = resultCourse[0].course
        }
        cb(errCourse, data)
      })
    },
    (data, cb) => {
      dashboardModel.getDiscussion(req, (errDiscussion, resultDiscussion) => {
        if (_.isEmpty(resultDiscussion)) {
          data.discussion = 0
        } else {
          data.discussion = resultDiscussion[0].discussion
        }
        cb(errDiscussion, data)
      })
    },
    (data, cb) => {
      redisCache.setex(key, 600, data)
      console.log('data cached')
      cb(null, data)
    }
  ], (errData, resultData) => {
    if (!errData) {
      return MiscHelper.responses(res, resultData)
    } else {
      return MiscHelper.errorCustomStatus(res, errData, 400)
    }
  })
}
