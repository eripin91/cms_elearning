/* global _ helpers redisCache */

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
      if (_.result(dataAdmin, 'adminid')) {
        if (dataAdmin.password === MiscHelper.setPassword(password, dataAdmin.salt).passwordHash) {
          cb(null, dataAdmin)
        } else {
          return MiscHelper.errorCustomStatus(res, 'Invalid email and password', 400)
        }
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
 * GET : '/admin/get'
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
  const key = `get-admin:${limit}:${offset}:${keyword}`

  async.waterfall([
    (cb) => {
      redisCache.get(key, admin => {
        if (_.result(admin, 'data')) {
          return MiscHelper.responses(res, admin.data, 200, { total: admin.total })
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      adminModel.get(req, limit, offset, keyword, (errAdmin, admin) => {
        cb(errAdmin, admin)
      })
    },
    (admin, cb) => {
      adminModel.getTotalAdmin(req, keyword, (errAdmin, total) => {
        const resultAdmin = {
          data: admin,
          total: total[0].total
        }
        cb(errAdmin, resultAdmin)
      })
    },
    (dataAdmin, cb) => {
      if (!_.isEmpty(dataAdmin.data)) {
        redisCache.setex(key, 0, dataAdmin)
      }
      cb(null, dataAdmin)
    }
  ], (errAdmin, resultAdmin) => {
    if (!errAdmin) {
      return MiscHelper.responses(res, resultAdmin.data, 200, { total: resultAdmin.total })
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
 * POST : '/admin/create'
 *
 * @desc Create admin user
 *
 * @param  {object} req - Parameters for request
 * @param  {integer} req.params.adminId - adminId for admin
 *
 * @return {object} Request object
 */

exports.create = (req, res) => {
  req.checkBody('email', 'email is required').notEmpty()
  req.checkBody('email', 'Invalid email format').isEmail()
  req.checkBody('password', 'password is required').notEmpty()
  req.checkBody('confpassword', 'confpassword is not match with password').isMatch(req.body.password)
  req.checkBody('nick', 'Full Name is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const confpassword = _.result(req.body, 'confpassword')

  const dataInsert = {
    groupid: 1,
    nick: req.body.nick,
    email: req.body.email,
    status: _.result(req.body, 'status', 0),
    created_at: new Date(),
    updated_at: new Date()
  }

  async.waterfall([
    (cb) => {
      adminModel.checkEmail(req, req.body.email, (err, result) => {
        if (err) cb(err)
        if (result && result.length > 0) {
          return MiscHelper.errorCustomStatus(res, 'Email already exists, please choose another email or do forgot password.', 409)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      const passwordSalt = MiscHelper.generateSalt(50)
      dataInsert.salt = passwordSalt
      dataInsert.password = MiscHelper.setPassword(confpassword, passwordSalt).passwordHash

      adminModel.insert(req, dataInsert, (errAdmin, resultAdmin) => {
        cb(errAdmin, resultAdmin)
      })
    },
    (resultAdmin, cb) => {
      redisCache.delwild('get-admin:*')
      cb(null, resultAdmin)
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
    nick: req.body.nick,
    status: req.body.status
  }

  if (confpassword && newpassword && confpassword === newpassword) {
    const passwordSalt = MiscHelper.generateSalt(50)
    dataUpdate.salt = passwordSalt
    dataUpdate.password = MiscHelper.setPassword(confpassword, passwordSalt).passwordHash
  }

  async.waterfall([
    (cb) => {
      console.log(req.body)
      adminModel.update(req, req.params.adminId, dataUpdate, (errAdmin, resultAdmin) => {
        cb(errAdmin, resultAdmin)
      })
    },
    (resultAdmin, cb) => {
      redisCache.delwild('get-admin:*')
      cb(null, resultAdmin)
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
 * GET : '/admin/delete/:adminId'
 *
 * @desc Delete admin user
 *
 * @param  {object} req - Parameters for request
 * @param  {integer} req.params.adminId - adminId for admin
 *
 * @return {object} Request object
 */

exports.delete = (req, res) => {
  req.checkParams('adminId', 'adminId is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      adminModel.update(req, req.params.adminId, { status: 2 }, (errAdmin, resultAdmin) => {
        cb(errAdmin, resultAdmin)
      })
    },
    (resultAdmin, cb) => {
      redisCache.delwild('get-admin:*')
      cb(null, resultAdmin)
    }
  ], (errAdmin, resultAdmin) => {
    if (!errAdmin) {
      return MiscHelper.responses(res, resultAdmin)
    } else {
      return MiscHelper.errorCustomStatus(res, errAdmin, 400)
    }
  })
}
