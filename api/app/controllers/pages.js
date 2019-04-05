/* global _ */

'use strict'

const async = require('async')
const pagesModel = require('../models/pages')
const redisCache = require('../libs/RedisCache')

/*
 * GET : '/pages/:slug'
 *
 * @desc Get page detail
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.params.slug - slug
 *
 * @return {object} Request object
 */

exports.get = (req, res) => {
  req.checkParams('slug', 'slug is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const key = `get-page-detail:${req.params.slug}:${new Date().getTime()}` // disabled cache
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
      pagesModel.get(req, req.params.slug, (errPage, resultPage) => {
        if (_.isEmpty(resultPage)) {
          return MiscHelper.errorCustomStatus(res, 'Page not found!', 404)
        }
        cb(errPage, _.result(resultPage, '[0]'))
      })
    }
  ], (errPage, resultPage) => {
    if (!errPage) {
      return MiscHelper.responses(res, resultPage)
    } else {
      return MiscHelper.errorCustomStatus(res, errPage)
    }
  })
}
