/* global _ helpers redisCache */

'use strict'

const async = require('async')
const pagesModel = require('../../models/pages')

/*
 * GET : '/pages/get'
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
  const keyword = _.result(req.query, 'keyword', '')
  const key = `get-pages:${limit}:${offset}:${keyword}`

  async.waterfall([
    (cb) => {
      redisCache.get(key, pages => {
        if (_.result(pages, 'data')) {
          return MiscHelper.responses(res, pages.data, 200, { total: pages.total })
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      pagesModel.get(req, limit, offset, keyword, (errPages, pages) => {
        cb(errPages, pages)
      })
    },
    (pages, cb) => {
      pagesModel.getTotalPages(req, keyword, (errPages, total) => {
        const resultPages = {
          data: pages,
          total: total[0].total
        }
        cb(errPages, resultPages)
      })
    },
    (datapages, cb) => {
      if (!_.isEmpty(datapages.data)) {
        redisCache.setex(key, 0, datapages)
      }
      cb(null, datapages)
    }
  ], (errPages, resultPages) => {
    if (!errPages) {
      return MiscHelper.responses(res, resultPages.data, 200, { total: resultPages.total })
    } else {
      return MiscHelper.errorCustomStatus(res, errPages, 400)
    }
  })
}

/*
 * GET : '/pages/get/:pageId'
 *
 * @desc Get detail pages
 *
 * @param  {object} req - Parameters for request
 * @param  {integer} req.params.pageId - pageId for pages
 *
 * @return {object} Request object
 */

exports.getDetail = (req, res) => {
  req.checkParams('pageId', 'pageId is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  pagesModel.getPagesDetail(req, req.params.pageId, (errPages, resultPages) => {
    if (!errPages) {
      return MiscHelper.responses(res, _.result(resultPages, '[0]', {}))
    } else {
      return MiscHelper.errorCustomStatus(res, errPages, 400)
    }
  })
}

/*
 * POST : '/pages/update/:pageId'
 *
 * @desc Update pages profile
 *
 * @param  {object} req - Parameters for request
 * @param  {integer} req.params.pageId - pageId for pages
 *
 * @return {object} Request object
 */

exports.update = (req, res) => {
  req.checkParams('pageId', 'pageId is required').notEmpty()
  req.checkBody('ptitle', 'title is required').notEmpty()
  req.checkBody('pcontent', 'content is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const dataUpdate = {
    ptitle: req.body.ptitle,
    pcontent: req.body.pcontent,
    updated_date: new Date()
  }

  async.waterfall([
    (cb) => {
      pagesModel.update(req, req.params.pageId, dataUpdate, (errPages, resultPages) => {
        cb(errPages, resultPages)
      })
    },
    (resultPages, cb) => {
      redisCache.delwild('get-pages:*')
      cb(null, resultPages)
    }
  ], (errPages, resultPages) => {
    if (!errPages) {
      return MiscHelper.responses(res, resultPages)
    } else {
      return MiscHelper.errorCustomStatus(res, errPages, 400)
    }
  })
}
