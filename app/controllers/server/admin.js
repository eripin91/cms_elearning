/* global _ helpers */

'use strict'

const async = require('async')
const adminModel = require('../../models/admin')

/*
 * POST : '/admin/login'
 *
 * @desc Login Panel
 *
 * @param  {object} req - Parameters for request
 * @param  {string} req.body.email - email account user
 * @param  {string} req.body.password - password account user
 *
 * @return {object} Request object
 */

exports.login = (req, res) => {
  req.checkBody('email', 'email is required').notEmpty()
  req.checkBody('password', 'password is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const email = req.body.email
  const password = req.body.password

  async.waterfall([
    (cb) => {
      adminModel.getAdminByEmail(req, email, (errAdmin, resultAdmin) => {
        cb(errAdmin, resultAdmin)
      })
    },
    (dataAdmin, cb) => {
      if (dataAdmin.password === MiscHelper.setPassword(password, dataAdmin.salt).passwordHash) {
        cb(null, dataAdmin)
      } else {
        return MiscHelper.errorCustomStatus(res, 'Invalid email and password', 400)
      }
    },
    (dataAdmin, cb) => {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
      const data = {
        lastlogin: ip + '*' + helpers.get_date_now()
      }

      adminModel.update(req, dataAdmin.adminid, data, (errUpdate, resultUodate) => {
        dataAdmin.lastlogin = data.lastlogin
        dataAdmin.perms = []
        cb(errUpdate, dataAdmin)
      })
    }
  ], (errAdmin, resultAdmin) => {
    if (!errAdmin) {
      return MiscHelper.responses(res, resultAdmin)
    } else {
      return MiscHelper.errorCustomStatus(res, errAdmin, 400)
    }
  })
}

/*
 * GET : '/admin/get/:adminId'
 *
 * @desc Get detail admin
 *
 * @param  {object} req - Parameters for request
 * @param  {integer} req.params.adminId - adminId for admin
 *
 * @return {object} Request object
 */

exports.getDetail = (req, res) => {
  req.checkParams('adminId', 'adminId is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  adminModel.getAdminDetail(req, req.params.adminId, (errAdmin, resultAdmin) => {
    if (!errAdmin) {
      return MiscHelper.responses(res, _.result(resultAdmin, '[0]', {}))
    } else {
      return MiscHelper.errorCustomStatus(res, errAdmin, 400)
    }
  })
}

/*
 * POST : '/admin/update/:adminId'
 *
 * @desc Update admin profile
 *
 * @param  {object} req - Parameters for request
 * @param  {integer} req.params.adminId - adminId for admin
 *
 * @return {object} Request object
 */

exports.update = (req, res) => {
  req.checkParams('adminId', 'adminId is required').notEmpty()
  req.checkBody('nick', 'nick is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const newpassword = _.result(req.body, 'newpassword')
  const confpassword = _.result(req.body, 'confpassword')

  const dataUpdate = {
    nick: req.body.nick
  }

  if (confpassword && newpassword && confpassword === newpassword) {
    const passwordSalt = MiscHelper.generateSalt(50)
    dataUpdate.salt = passwordSalt
    dataUpdate.password = MiscHelper.setPassword(confpassword, passwordSalt).passwordHash
  }

  adminModel.update(req, req.params.adminId, dataUpdate, (errAdmin, resultAdmin) => {
    if (!errAdmin) {
      return MiscHelper.responses(res, resultAdmin)
    } else {
      return MiscHelper.errorCustomStatus(res, errAdmin, 400)
    }
  })
}
