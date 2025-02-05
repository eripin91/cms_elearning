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
 * @desc Get admin list view
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */
exports.main = async (req, res) => {
  const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
  res.render('admin', { errorMsg: errorMsg })
}

/*
 * GET : '/ajax/get'
 *
 * @desc Ajax get admin list
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */
exports.ajaxGet = async (req, res) => {
  API_SERVICE.get('v1/admin/get', { limit: _.result(req.query, 'length', 25), offset: _.result(req.query, 'start', 0), keyword: req.query.search['value'] }, (err, response) => {
    if (!err) {
      const dataAdmin = []
      async.eachSeries(_.result(response, 'data', {}), (item, next) => {
        item.action = MiscHelper.getActionButtonFull('admin', item.adminid)
        item.status = MiscHelper.getStatus(item.status, 1)
        item.created_at = moment(item.created_at).format('DD/MM/YYYY hh:mm')
        dataAdmin.push(item)
        next()
      }, err => {
        if (!err) {
          const data = {
            draw: _.result(req.query, 'draw', 1),
            recordsTotal: _.result(response, 'total', 0),
            recordsFiltered: _.result(response, 'total', 0)
          }

          return MiscHelper.responses(res, dataAdmin, 200, data)
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
 * GET && POST : '/add'
 *
 * @desc Add admin
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */
exports.add = async (req, res) => {
  if (_.isEmpty(req.body)) {
    const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
    res.render('admin_add', { errorMsg: errorMsg })
  } else {
    const email = req.body.email
    const nick = req.body.nick
    const password = req.body.password
    const confpassword = req.body.confpassword

    if (!email || !nick || !password) {
      MiscHelper.set_error_msg({ error: 'Data yang anda masukkan tidak lengkap !!!' }, req.sessionID)
      res.redirect('/admin/add')
    } else if (password !== confpassword) {
      MiscHelper.set_error_msg({ error: 'Password dan konfimasi password tidak sesuai !!!' }, req.sessionID)
      res.redirect('/admin/add')
    } else {
      API_SERVICE.post('v1/admin/create', req.body, (err, response) => {
        if (!err) {
          MiscHelper.set_error_msg({ info: 'Admin berhasil ditambahkan.' }, req.sessionID)
          res.redirect('/admin')
        } else {
          MiscHelper.set_error_msg({ error: response.message }, req.sessionID)
          res.redirect('/admin/add')
        }
      })
    }
  }
}

/*
 * GET && POST : '/update'
 *
 * @desc Update admin
 *
 * @param  {object} req - for request
 * @param  {object} req.body.adminId - adminId for identifier
 *
 * @return {object} Request object
 */
exports.update = async (req, res) => {
  if (_.isEmpty(req.body)) {
    const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
    API_SERVICE.get('v1/admin/get/' + req.params.adminId, {}, (err, response) => {
      if (err) console.error(err)
      res.render('admin_update', { errorMsg: errorMsg, data: response.data })
    })
  } else {
    const adminId = req.body.id
    const nick = req.body.nick
    const password = req.body.newpassword
    const confpassword = req.body.confpassword

    if (!adminId) {
      MiscHelper.set_error_msg({ error: 'Kesalahan input data !!!' }, req.sessionID)
      res.redirect('/admin')
    } else {
      if (!nick) {
        MiscHelper.set_error_msg({ error: 'Fullname wajib di isi !!!' }, req.sessionID)
        res.redirect('/admin/update/' + adminId)
      } else {
        if (password) {
          if (password !== confpassword) {
            MiscHelper.set_error_msg({ error: 'Password dan konfimasi password tidak sesuai !!!' }, req.sessionID)
            res.redirect('/admin/update/' + adminId)
          }
        }

        API_SERVICE.post('v1/admin/update/' + adminId, req.body, (err, response) => {
          if (!err) {
            MiscHelper.set_error_msg({ info: 'Admin berhasil diubah.' }, req.sessionID)
            res.redirect('/admin')
          } else {
            MiscHelper.set_error_msg({ error: err.message }, req.sessionID)
            res.redirect('/admin/update/' + adminId)
          }
        })
      }
    }
  }
}

/*
 * GET : '/delete/:adminId'
 *
 * @desc Get dashboard home
 *
 * @param  {object} req - Parameters for request
 * @param  {object} req.params.adminId - Parameters adminId for identifier
 *
 * @return {object} Request object
 */
exports.delete = async (req, res) => {
  const adminId = 0 || req.params.adminId
  if (!adminId) {
    MiscHelper.set_error_msg({ error: 'adminId required !!!' }, req.sessionID)
    res.redirect('/admin')
  } else {
    API_SERVICE.get('v1/admin/delete/' + adminId, {}, (err, response) => {
      if (err) {
        MiscHelper.set_error_msg({ error: err }, req.sessionID)
      } else {
        MiscHelper.set_error_msg({ info: 'Admin berhasil dihapus.' }, req.sessionID)
        res.redirect('/admin')
      }
    })
  }
}
