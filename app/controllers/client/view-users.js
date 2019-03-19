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
  const ranking = _.result(req.query, 'ranking')
  const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
  
  if (!ranking) {
    res.render('users', { errorMsg: errorMsg, data: req.query })
  } else {
    res.render('users_ranking', { errorMsg: errorMsg, data: req.query })
  }
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
  const ranking = _.result(req.query, 'ranking', false)

  API_SERVICE.get('v1/users/get', { ranking: ranking, limit: _.result(req.query, 'length', 25), offset: _.result(req.query, 'start', 0), keyword: req.query.search['value'], classId: classId }, (err, response) => {
    if (!err) {
      const dataUsers = []
      let i = 1
      async.eachSeries(_.result(response, 'data', {}), (item, next) => {
        item.action = MiscHelper.getActionButtonFull('users', item.userid)
        item.ranking = i
        item.score = parseInt(item.score)
        item.confirm = MiscHelper.getConfirm(item.confirm)
        item.created_at = moment(item.created_at).format('DD/MM/YYYY hh:mm')
        dataUsers.push(item)
        ++i
        next()
      }, err => {
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
      })
    } else {
      return MiscHelper.errorCustomStatus(res, err, _.result(err, 'status', 400))
    }
  })
}

/*
 * GET && POST : '/update'
 *
 * @desc Update user
 *
 * @param  {object} req - for request
 * @param  {object} req.body.userId - userId for identifier
 *
 * @return {object} Request object
 */
exports.update = async (req, res) => {
  if (_.isEmpty(req.body)) {
    const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
    API_SERVICE.get('v1/users/get/' + req.params.userId, {}, (err, response) => {
        if (err) console.error(err)
        res.render('users_update', { errorMsg: errorMsg, data: response.data })
    })
  } else {
    const userId = req.body.id
    const fullname = req.body.fullname
    const phone = req.body.phone
    const status = req.body.status

    if (!userId) {
      MiscHelper.set_error_msg(
        { error: 'Kesalahan input data !!!' },
        req.sessionID
      )
      res.redirect('/users')
    } else {
      if (!fullname) {
        MiscHelper.set_error_msg(
          { error: 'Fullname wajib di isi !!!' },
          req.sessionID
        )
        res.redirect('/users/update/' + userId)
      } else {
        API_SERVICE.post('v1/users/update/' + userId, req.body, (err, response) => {
          if (!err) {
            MiscHelper.set_error_msg({ info: 'User berhasil diubah.' }, req.sessionID)
            res.redirect('/users')
          } else {
            MiscHelper.set_error_msg({ error: err.message }, req.sessionID)
            res.redirect('/users/update/' + userId)
          }
        })
      }
    }
  }
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
        MiscHelper.set_error_msg({ info: 'User berhasil dihapus.' }, req.sessionID)
        res.redirect('/users')
      }
    })
  }
}
