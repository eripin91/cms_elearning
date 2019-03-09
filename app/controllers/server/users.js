/* global _ redisCache */

'use strict'

const async = require('async')
const usersModel = require('../../models/users')

/*
 * GET : '/users/get'
 *
 * @desc Get user list
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */

exports.get = (req, res) => {
  const limit = _.result(req.query, 'limit', 10)
  const offset = _.result(req.query, 'offset', 0)
  const keyword = _.result(req.query, 'keyword')
  const key = `get-user:${limit}:${offset}:${keyword}`

  async.waterfall([
    (cb) => {
      redisCache.get(key, users => {
        if (_.result(users, 'data')) {
          return MiscHelper.responses(res, users.data, 200, {total: users.total})
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      usersModel.get(req, limit, offset, keyword, (errUsers, users) => {
        cb(errUsers, users)
      })
    },
    (users, cb) => {
      usersModel.getTotalUser(req, keyword, (errUsers, total) => {
        const resultUsers = {
          data: users,
          total: total[0].total
        }
        cb(errUsers, resultUsers)
      })
    },
    (dataUser, cb) => {
      redisCache.setex(key, 0, dataUser)
      cb(null, dataUser)
    }
  ], (errUsers, resultUsers) => {
    if (!errUsers) {
      return MiscHelper.responses(res, resultUsers.data, 200, {total: resultUsers.total})
    } else {
      return MiscHelper.errorCustomStatus(res, errUsers, 400)
    }
  })
}

/*
 * GET : '/users/delete/:userId'
 *
 * @desc Get user list
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */

exports.delete = (req, res) => {
  req.checkParams('userId', 'userId is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      usersModel.update(req, req.params.userId, { status: 0 }, (errUsers) => {
        cb(errUsers)
      })
    },
    (cb) => {
      redisCache.delwild('get-user:*')
      cb(null)
    }
  ], errUsers => {
    if (!errUsers) {
      return MiscHelper.responses(res, { status: true }, 200)
    } else {
      return MiscHelper.errorCustomStatus(res, errUsers, 400)
    }
  })
}