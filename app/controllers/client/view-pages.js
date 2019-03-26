'use strict'

const ApiLibs = require('../../libs/API')
const async = require('async')
const moment = require('moment')

const API_SERVICE = ApiLibs.client({
  baseUrl: CONFIG.SERVER.BASE_WEBHOST,
  headers: CONFIG.REQUEST_HEADERS
})

/*
 * GET : '/'
 *
 * @desc Get pages list view
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */
exports.main = async (req, res) => {
  const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
  res.render('pages', { errorMsg: errorMsg })
}

/*
 * GET : '/ajax/get'
 *
 * @desc Ajax get pages list
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */
exports.ajaxGet = async (req, res) => {
  API_SERVICE.get('v1/pages/get', { limit: _.result(req.query, 'length', 25), offset: _.result(req.query, 'start', 0), keyword: req.query.search['value'] }, (err, response) => {
    if (!err) {
      const datePages = []
      async.eachSeries(_.result(response, 'data', {}), (item, next) => {
        item.action = MiscHelper.getActionButtonUpdate('pages', item.pageid)
        item.updated_date = moment(item.updated_date).format('DD/MM/YYYY hh:mm')
        datePages.push(item)
        next()
      }, err => {
        if (!err) {
          const data = {
            draw: _.result(req.query, 'draw', 1),
            recordsTotal: _.result(response, 'total', 0),
            recordsFiltered: _.result(response, 'total', 0)
          }

          return MiscHelper.responses(res, datePages, 200, data)
        } else {
          return MiscHelper.errorCustomStatus(res, err, 400)
        }
      })
    } else {
      return MiscHelper.errorCustomStatus(res, err, _.result(err, 'status', 400))
    }
  })
}

/*
 * GET && POST : '/update'
 *
 * @desc Update page
 *
 * @param  {object} req - for request
 * @param  {object} req.body.pageId - pageId for identifier
 *
 * @return {object} Request object
 */
exports.update = async (req, res) => {
  if (_.isEmpty(req.body)) {
    const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
    API_SERVICE.get('v1/pages/get/' + req.params.pageId, {}, (err, response) => {
      if (err) console.error(err)
      res.render('pages_update', { errorMsg: errorMsg, data: response.data })
    })
  } else {
    const pageId = req.body.id
    const ptitle = req.body.ptitle
    const pcontent = req.body.pcontent

    if (!pageId) {
      MiscHelper.set_error_msg({ error: 'Kesalahan input data !!!' }, req.sessionID)
      res.redirect('/pages')
    } else {
      if (!ptitle) {
        MiscHelper.set_error_msg({ error: 'Title wajib di isi !!!' }, req.sessionID)
        res.redirect('/pages/update/' + pageId)
      } else if (!pcontent) {
        MiscHelper.set_error_msg({ error: 'Content input data !!!' }, req.sessionID)
        res.redirect('/pages/update/' + pageId)
      } else {
        API_SERVICE.post('v1/pages/update/' + pageId, req.body, (err, response) => {
          if (!err) {
            MiscHelper.set_error_msg({ info: 'Page berhasil diubah.' }, req.sessionID)
            res.redirect('/pages')
          } else {
            MiscHelper.set_error_msg({ error: err.message }, req.sessionID)
            res.redirect('/pages/update/' + pageId)
          }
        })
      }
    }
  }
}
