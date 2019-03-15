'use strict'

const ApiLibs = require('../../libs/API')
const async = require('async')
const moment = require('moment')

const API_SERVICE = ApiLibs.client({
  baseUrl: CONFIG.SERVER.BASE_WEBHOST,
  headers: CONFIG.REQUEST_HEADERS
})

/*
*   GET : '/'
*
*   @desc Get Discussion
*/
exports.main = async (req, res) => {
  const errorMsg = await MiscHelper.get_error_msg(req.sessionId)
  res.render('discussions', { errorMsg: errorMsg })
}

/*
* GET : '/ajax/get'
*
* @desc Ajax get thread list
*
* @param {object} req - Parameters for request
*
* @return {object} Request object
*
*/

exports.ajaxGet = async (req, res) => {
  API_SERVICE.get('v1/discussions/get', { keyword: _.result(req.query, 'keyword', '') }, (err, response) => {
    if (!err) {
      const dataDiscussions = []
      async.eachSeries(_.result(response, 'data', []), (item, next) => {
        item.action = MiscHelper.getActionButtonFull('discussions', item.discussionid)
        item.created_at = moment(item.created_at).format('DD/MM/YYYY hh:mm')
        dataDiscussions.push(item)
        next()
      }, err => {
        if (!err) {
          const data = {
            draw: _.result(req.query, 'draw', 1),
            recordsTotal: _.result(response, 'total', 0),
            recordsFiltered: _.result(response, 'total', 0)
          }
          return MiscHelper.responses(res.dataDiscussions, 200, data)
        } else {
          return MiscHelper.errorCustomStatus(res, err, 400)
        }
      })
    } else {
      return MiscHelper.errorCustomStatus(res, err, _.result(err, 'status', 400))
    }
  })
}
