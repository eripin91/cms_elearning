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
*   GET : '/detail/:discussionId'
*
*   @desc Get Discussion
*/
exports.detail = async (req, res) => {
  const discussionId = req.params.discussionId
  API_SERVICE.get('v1/discussions/get/detail/' + discussionId, { }, (err, response) => {
    if (err) console.error(err)
    res.render('discussions_detail', { discussionId: discussionId, dataDiscussions: _.result(response, 'data', {}) })
  })
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
  const limit = parseFloat(_.result(req.query, 'length')) === -1 ? 1000 : _.result(req.query, 'length', 25)

  API_SERVICE.get('v1/discussions/get', { limit: limit, offset: _.result(req.query, 'start', 0), keyword: req.query.search['value'], discussionId: req.query.detail }, (err, response) => {
    if (!err) {
      const dataDiscussions = []
      async.eachSeries(_.result(response, 'data', []), (item, next) => {
        if (limit === 1000) {
          item.action = MiscHelper.getActionButton('discussions', item.discussionid)
        } else {
          item.action = MiscHelper.getActionButtonDiscussion('discussions', item.discussionid)
        }
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

          return MiscHelper.responses(res, dataDiscussions, 200, data)
        } else {
          return MiscHelper.errorCustomStatus(res, err, 400)
        }
      })
    } else {
      return MiscHelper.errorCustomStatus(res, err, _.result(err, 'status', 400))
    }
  })
}

exports.delete = async (req, res) => {
  const discussionId = req.params.discussionId
  console.log(discussionId)
  if (!discussionId) {
    MiscHelper.set_error_msg({ error: 'Discussion ID required !!!' }, req.sessionID)
    res.redirect('/discussions')
  } else {
    API_SERVICE.get('v1/discussions/delete/' + discussionId, {}, (err, response) => {
      if (err) {
        MiscHelper.set_error_msg({ error: err.message }, req.sessionID)
      } else {
        MiscHelper.set_error_msg({ info: 'Diskusi berhasil dihapus.' }, req.sessionID)
        res.redirect('/discussions')
      }
    })
  }
}
