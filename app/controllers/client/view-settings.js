'use strict'

const ApiLibs = require('../../libs/API')

const API_SERVICE = ApiLibs.client({
  baseUrl: CONFIG.SERVER.BASE_WEBHOST,
  headers: CONFIG.REQUEST_HEADERS
})

/*
 * GET : '/settings'
 *
 * @desc Get profile setting
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */
exports.main = async (req, res) => {
  const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
  API_SERVICE.get('v1/admin/get/' + sauth.adminid, { }, (err, response) => {
    if (err) console.error(err)
    res.render('settings', { errorMsg: errorMsg, data: response.data })
  })
}

/*
 * POST : '/login/logging'
 *
 * @desc Settings user
 *
 * @param  {object} req - Parameters for request
 * @param  {string} req.body.adminid - adminid account admin
 * @param  {string} req.body.nick - email account admin
 * @param  {string} req.body.oldpass - old password account admin
 * @param  {string} req.body.newpass - new password account admin
 * @param  {string} req.body.confpass - confirm password account admin
 *
 * @return {object} Request object
 */
exports.update = (req, res) => {
  const input = req.body
  const oldpass = _.result(input, 'oldpass')
  const newpass = _.result(input, 'newpass')
  const confpass = _.result(input, 'confpass')

  if (input.adminid) {
    if (!input.email || !input.nick) {
      MiscHelper.set_error_msg({ error: 'Data yang anda masukkan tidak lengkap !!!' }, req.sessionID)
      res.redirect('/settings')
    } else {
      if (oldpass) {
        if (newpass === confpass) {
          API_SERVICE.get('v1/admin/get/' + sauth.adminid, { }, (err, dataAdmin) => {
            dataAdmin = dataAdmin.data
            if (!err) {
              if (dataAdmin.password === MiscHelper.setPassword(oldpass, dataAdmin.salt).passwordHash) {
                API_SERVICE.post('v1/admin/update/' + sauth.adminid, { status: 1, newpassword: newpass, confpassword: confpass, nick: input.nick }, (err, dataUpdate) => {
                  if (err) console.error(err)
                  MiscHelper.set_error_msg({ info: 'Profile berhasil di update.' }, req.sessionID)
                  res.redirect('/settings')
                })
              } else {
                MiscHelper.set_error_msg({ error: 'Password lama tidak sesuai !!!' }, req.sessionID)
                res.redirect('/settings')
              }
            } else {
              MiscHelper.set_error_msg({ error: 'Kesalahan input data !!!' }, req.sessionID)
              res.redirect('/settings')
            }
          })
        } else {
          MiscHelper.set_error_msg({ error: 'password dan konfirmasi password tidak sesuai !!!' }, req.sessionID)
          res.redirect('/settings')
        }
      } else {
        API_SERVICE.post('v1/admin/update/' + sauth.adminid, { status: 1, nick: input.nick }, (err, dataAdmin) => {
          if (err) console.error(err)
          MiscHelper.set_error_msg({ info: 'Profile berhasil di update.' }, req.sessionID)
          res.redirect('/settings')
        })
      }
    }
  } else {
    MiscHelper.set_error_msg({ error: 'Kesalahan input data !!!' }, req.sessionID)
    res.redirect('/settings')
  }
}
