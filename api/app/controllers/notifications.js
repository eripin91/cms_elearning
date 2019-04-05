/* global _ */

'use strict'

const async = require('async')
const notificationsModel = require('../models/notifications')
const redisCache = require('../libs/RedisCache')

exports.get = (req, res) => {
  req.checkParams('userId', 'userId is required').notEmpty().isInt()

  const limit = parseInt(_.result(req.query, 'limit', 0))
  const page = parseInt(_.result(req.query, 'page', 0))
  const offset = page === 1 ? 0 : (limit * (page || 1))
  const userId = req.params.userId

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const key = `get-notification:${userId}:${limit}:${page}:${offset}` + new Date().getTime()

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
      notificationsModel.getNotification(req, userId, limit, offset, (errNotif, resultNotif) => {
        cb(errNotif, resultNotif)
      })
    },
    (resultNotif, cb) => {
      if (resultNotif && limit > 0) {
        notificationsModel.countNotification(req, userId, (errNotif, countNotif) => {
          const dataNotif = {
            notifications: resultNotif,
            total: _.result(countNotif, '[0].total', 0)
          }
          cb(errNotif, dataNotif)
        })
      } else {
        cb(null, resultNotif)
      }
    }
  ], (errNotif, resultNotif) => {
    if (!errNotif) {
      return MiscHelper.responses(res, resultNotif)
    } else {
      return MiscHelper.errorCustomStatus(res, errNotif)
    }
  })
}
