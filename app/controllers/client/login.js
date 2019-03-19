/* global CONFIG, _ */

'use strict'

const ApiLibs = require('../../libs/API')

const API_SERVICE = ApiLibs.client({
  baseUrl: CONFIG.SERVER.BASE_WEBHOST,
  headers: CONFIG.REQUEST_HEADERS
})

/*
 * GET : '/login'
 *
 * @desc Get user list
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */
exports.main = async (req, res) => {
  const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
  res.render('login', { errorMsg: errorMsg, layout: false })
}

/*
 * POST : '/login/logging'
 *
 * @desc Login Panel
 *
 * @param  {object} req - Parameters for request
 * @param  {string} req.body.uemail - email account user
 * @param  {string} req.body.upass - password account user
 *
 * @return {object} Request object
 */
exports.logging = (req, res) => {
  const input = req.body
  if (!input.uemail || !input.upass) {
    MiscHelper.set_error_msg({ error: 'Email dan Password harus di isi !!!' }, req.sessionID)
    res.redirect('/login')
  } else {
    global.sauth = req.session

    API_SERVICE.post('v1/admin/login', { email: input.uemail, password: input.upass }, (err, response) => {
      if (!err) {
        response = _.result(response, 'data')
        if (_.result(response, 'adminid')) {
          const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
          let memberSince = new Date(_.result(response, 'created_at'))
          memberSince = monthNames[memberSince.getMonth()] + ' ' + memberSince.getFullYear()

          sauth.login = {
            adminid: _.result(response, 'adminid'),
            created_at: memberSince,
            group: _.result(response, 'groupid'),
            email: _.result(response, 'email'),
            perms: _.result(response, 'perms')
          }

          res.redirect('/')
        } else {
          MiscHelper.set_error_msg({ error: 'Email dan Password tidak sesuai !!!' }, req.sessionID)
          res.redirect('/login')
        }
      } else {
        MiscHelper.set_error_msg({ error: err.message }, req.sessionID)
        res.redirect('/login')
      }
    })
  }
}

exports.logout = (req, res) => {
  delete req.session.login
  req.session.destroy()
  res.redirect('/login')
}
