/* global _ */

'use strict'

const async = require('async')
const statsModel = require('../../models/stats')
const usersModel = require('../../models/users')
const redisCache = require('../../libs/RedisCache')

/*
 * GET : '/stats/detail/:userId'
 *
 * @desc Get stats detail per user
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.params.userId - userId
 *
 * @return {object} Request object
 */

exports.getDetail = (req, res) => {
  req.checkParams('userId', 'userId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const key = `get-stats-detail:${req.params.userId}:${new Date().getTime()}` // disabled cache
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
      statsModel.getUserStatistic(req, req.params.userId, (errStats, resultStats) => {
        if (_.isEmpty(resultStats)) {
          return MiscHelper.errorCustomStatus(res, 'Stats not found!', 404)
        }
        cb(errStats, _.result(resultStats, '[0]'))
      })
    },
    (dataStat, cb) => {
      statsModel.getCertificate(req, req.params.userId, (err, result) => {
        if (!err) {
          const data = result.slice(0, 5)
          dataStat.certificate_length = result.length
          dataStat.certificate = data
        }
        cb(err, dataStat)
      })
    },
    (dataStat, cb) => {
      async.eachSeries(dataStat.certificate, (item, next) => {
        statsModel.checkClass(req, item.classid, (err, result) => {
          if (err) console.error(err)

          result.map((className) => {
            item.content = `Lulus dari kelas ${className.name}`
          })

          let date = new Date(item.finished_at)
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          item.time = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`

          next()
        })
      }, err => {
        cb(err, dataStat)
      })
    },
    (dataStat, cb) => {
      statsModel.getUserAchievementClass(req, req.params.userId, (err, result) => {
        if (!err) {
          const data = result.slice(0, 5)
          dataStat.award_length = result.length
          dataStat.award = data
        }
        cb(err, dataStat)
      })
    },
    (dataStat, cb) => {
      async.eachSeries(dataStat.award, (item, next) => {
        statsModel.getUserAchievementScore(req, item.classid, (err, result) => {
          if (err) console.error(err)
          result.map((rank, index) => {
            if (rank.userid === item.userid) {
              item.message = `Peringkat ${index + 1} di Kelas ${rank.name}`

              let date = new Date(rank.created_at)
              const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
              item.time = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
            }
          })
          next()
        })
      }, err => {
        cb(err, dataStat)
      })
    },
    (dataStat, cb) => {
      statsModel.getClassByUser(req, req.params.userId, (errClass, resultClass) => {
        dataStat.classes = resultClass
        redisCache.setex(key, 600, dataStat)
        cb(errClass, dataStat)
      })
    },
    (dataStat, cb) => {
      usersModel.getDetail(req, req.params.userId, (errUser, resultUser) => {
        dataStat.user = _.result(resultUser, '[0]', {})
        redisCache.setex(key, 600, dataStat)
        cb(errUser, dataStat)
      })
    }
  ], (errStats, resultStats) => {
    if (!errStats) {
      return MiscHelper.responses(res, resultStats)
    } else {
      return MiscHelper.errorCustomStatus(res, errStats)
    }
  })
}
