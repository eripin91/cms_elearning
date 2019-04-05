/* global _ */

'use strict'

const async = require('async')
const statsModel = require('../models/stats')
const redisCache = require('../libs/RedisCache')

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

exports.get = (req, res) => {
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
        redisCache.setex(key, 600, dataStat)
        cb(err, dataStat)
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

/*
 * GET : '/stats/certificate/:userId/:classId'
 *
 * @desc Get certificate of passing class by user
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.params.userId - userId
 * @param  {objectId} req.params.classId - classId
 *
 * @return {object} Request object
 */

exports.getCertificate = (req, res) => {
  req.checkParams('userId', 'userId is required').notEmpty().isInt()
  req.checkParams('classId', 'classId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const key = `get-certificate-${req.params.userId}-${req.params.classId}`
  async.waterfall([
    (cb) => {
      redisCache.get(key, detail => {
        if (detail) {
          return MiscHelper.responses(res, detail)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      statsModel.getUserCertificate(req, req.params.userId, req.params.classId, (errCertificate, resultCertificate) => {
        if (_.isEmpty(resultCertificate)) {
          resultCertificate.push({ message: 'You are Not Passed This Class Yet' })
          cb(errCertificate, resultCertificate[0])
        } else {
          resultCertificate[0].certificate = `Sertifikat ini diberikan kepada ${resultCertificate[0].username} Sebagai bukti Kelulusan dari kelas ${resultCertificate[0].classname}`
          cb(errCertificate, resultCertificate[0])
        }
      })
    },
    (dataCertificate, cb) => {
      redisCache.setex(key, 600, dataCertificate)
      cb(null, dataCertificate)
    }
  ], (errCertificate, resultCertificate) => {
    if (!errCertificate) {
      return MiscHelper.responses(res, resultCertificate)
    } else {
      return MiscHelper.errorCustomStatus(res, errCertificate)
    }
  })
}

/*
 * GET : '/stats/certificate/:userId'
 *
 * @desc Get all certificate list per user
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.params.userId - userId
 *
 * @return {object} Request object
 */

exports.getCertificateList = (req, res) => {
  req.checkParams('userId', 'userId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const key = `get-certificate-${req.params.userId}`

  async.waterfall([
    (cb) => {
      redisCache.get(key, detail => {
        if (detail) {
          return MiscHelper.responses(res, detail)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      statsModel.getCertificate(req, req.params.userId, (errCertificate, resultCertificate) => {
        cb(errCertificate, resultCertificate)
      })
    },
    (data, cb) => {
      async.eachSeries(data, (item, next) => {
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
        cb(err, data)
      })
    },
    (dataCertificate, cb) => {
      redisCache.setex(key, 600, dataCertificate)
      cb(null, dataCertificate)
    }
  ], (errList, resultList) => {
    if (!errList) {
      return MiscHelper.responses(res, resultList)
    } else {
      return MiscHelper.errorCustomStatus(res, errList)
    }
  })
}

/*
 * GET : '/stats/rank/:userId'
 *
 * @desc Get all 'prestasi' list per user
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.params.userId - userId
 *
 * @return {object} Request object
 */

exports.getRank = (req, res) => {
  req.checkParams('userId', 'userId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(req, req.validationErrors(true))
  }

  const key = `get-user-achievement-${req.params.userId}:${new Date().getTime()}`

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
      statsModel.getUserAchievementClass(req, req.params.userId, (errClass, resultClass) => {
        if (_.isEmpty(resultClass)) {
          return MiscHelper.errorCustomStatus(res, { message: 'You Have No Achievement' })
        } else {
          cb(errClass, resultClass)
        }
      })
    },
    (dataClass, cb) => {
      async.eachSeries(dataClass, (item, next) => {
        statsModel.getUserAchievementScore(req, item.classid, (errUserScore, resultUserScore) => {
          if (errUserScore) console.error(errUserScore)

          let index = resultUserScore.findIndex(x => x.userid === item.userid)
          item.class_name = resultUserScore[index].name
          item.message = `Peringkat ${index + 1} di Kelas ${item.class_name}`

          let date = new Date(resultUserScore[index].created_at)
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          item.time = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`

          next()
        })
      }, err => {
        redisCache.setex(key, 81600, dataClass)
        cb(err, dataClass)
      })
    }
  ], (errUserScore, resultUserScore) => {
    if (!errUserScore) {
      return MiscHelper.responses(res, resultUserScore)
    } else {
      return MiscHelper.errorCustomStatus(res, errUserScore, 400)
    }
  })
}
