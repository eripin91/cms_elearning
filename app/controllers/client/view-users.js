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
 * @desc Get user list view
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */
exports.main = async (req, res) => {
  const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
  res.render('users', { errorMsg: errorMsg, data: req.query })
}

/*
 * GET : '/ajax/get'
 *
 * @desc Ajax Get user list
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */
exports.ajaxGet = async (req, res) => {
  const classId = _.result(req.query, 'classid', 0)
  API_SERVICE.get(
    'v1/users/get',
    {
      limit: _.result(req.query, 'length', 25),
      offset: _.result(req.query, 'start', 0),
      keyword: req.query.search['value'],
      classId: classId
    },
    (err, response) => {
      if (!err) {
        const dataUsers = []
        async.eachSeries(
          _.result(response, 'data', {}),
          (item, next) => {
            item.action = MiscHelper.getActionButton('users', item.userid)
            item.confirm = MiscHelper.getConfirm(item.confirm)
            item.created_at = moment(item.created_at).format('DD/MM/YYYY hh:mm')
            dataUsers.push(item)
            next()
          },
          err => {
            if (!err) {
              const data = {
                draw: _.result(req.query, 'draw', 1),
                recordsTotal: _.result(response, 'total', 0),
                recordsFiltered: _.result(response, 'total', 0)
              }

              return MiscHelper.responses(res, dataUsers, 200, data)
            } else {
              return MiscHelper.errorCustomStatus(res, err, 400)
            }
          }
        )
      } else {
        return MiscHelper.errorCustomStatus(
          res,
          err,
          _.result(err, 'status', 400)
        )
      }
    }
  )
}

/*
 * GET : '/delete'
 *
 * @desc Delete user account
 *
 * @param  {object} req - Parameters for request
 * @param  {object} req.params.userId - Parameters userId for identifier
 *
 * @return {object} Request object
 */
exports.delete = async (req, res) => {
  const userId = 0 || req.params.userId
  if (!userId) {
    MiscHelper.set_error_msg({ error: 'UserId required !!!' }, req.sessionID)
    res.redirect('/users')
  } else {
    API_SERVICE.get('v1/users/delete/' + userId, {}, (err, response) => {
      if (err) {
        MiscHelper.set_error_msg({ error: err.message }, req.sessionID)
      } else {
        MiscHelper.set_error_msg(
          { info: 'User berhasil dihapus.' },
          req.sessionID
        )
        res.redirect('/users')
      }
    })
  }
}
