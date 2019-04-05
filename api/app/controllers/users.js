/* global _ */

'use strict'

const async = require('async')
const moment = require('moment')
const isRealEmail = require('mailchecker/platform/node').isValid
const jsonwebtoken = require('jsonwebtoken')
const usersModel = require('../models/users')
const redisCache = require('../libs/RedisCache')
const mail = require('../libs/mail')

/*
 * GET : '/users/get'
 *
 * @desc Get user list
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */

exports.get = (req, res) => {
  const key = 'get-user'
  async.waterfall([
    (cb) => {
      redisCache.get(key, users => {
        if (users) {
          return MiscHelper.responses(res, users)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      usersModel.get(req, (errUsers, resultUsers) => {
        cb(errUsers, resultUsers)
      })
    },
    (dataUser, cb) => {
      redisCache.setex(key, 0, dataUser)
      cb(null, dataUser)
    }
  ], (errUsers, resultUsers) => {
    if (!errUsers) {
      return MiscHelper.responses(res, resultUsers)
    } else {
      return MiscHelper.errorCustomStatus(res, errUsers, 400)
    }
  })
}

/*
 * GET : '/users/get/:userId'
 *
 * @desc Get user by userId
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */

exports.getDetail = (req, res) => {
  req.checkParams('userId', 'userId is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const key = `get-user:${req.params.userId}`

  async.waterfall([
    (cb) => {
      redisCache.get(key, users => {
        if (users) {
          return MiscHelper.responses(res, users)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      usersModel.getUserById(req, req.params.userId, (errUser, resultUser) => {
        cb(errUser, resultUser)
      })
    },
    (dataUser, cb) => {
      redisCache.setex(key, 0, dataUser)
      cb(null, dataUser)
    }
  ], (errUser, resultUser) => {
    if (!errUser) {
      return MiscHelper.responses(res, resultUser)
    } else {
      return MiscHelper.errorCustomStatus(res, errUser, 400)
    }
  })
}
/*
 * GET : '/users/:userId/classes'
 *
 * @desc Get user list
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.params.userId - userId
 *
 * @return {object} Request object
 */

exports.getUserClass = (req, res) => {
  req.checkParams('userId', 'userId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const key = 'get-user-class-' + req.params.userId
  async.waterfall([
    (cb) => {
      redisCache.get(key, userClass => {
        if (userClass) {
          return MiscHelper.responses(res, userClass)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      usersModel.getUserClass(req, req.params.userId, (errClass, resultClass) => {
        cb(errClass, resultClass)
      })
    },
    (dataUserClass, cb) => {
      redisCache.setex(key, 600, dataUserClass)
      cb(null, dataUserClass)
    }
  ], (errUserClass, resultUserClass) => {
    if (!errUserClass) {
      return MiscHelper.responses(res, resultUserClass)
    } else {
      return MiscHelper.errorCustomStatus(res, errUserClass, 400)
    }
  })
}

/*
 * POST : '/users/login'
 *
 * @desc Login user account
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.body.email - email account user
 * @param  {objectId} req.body.password - password account user
 *
 * @return {object} Request object
 */

exports.login = (req, res) => {
  req.checkBody('email', 'email is required').notEmpty()
  req.checkBody('password', 'password is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      usersModel.getUserByEmail(req, req.body.email, (errUser, user) => {
        if (!user) return MiscHelper.notFound(res, 'Email not found on our database')
        const dataUser = _.result(user, '[0]')
        if (_.result(dataUser, 'salt')) {
          if (dataUser.confirm === 1) {
            if (MiscHelper.setPassword(req.body.password, dataUser.salt).passwordHash === dataUser.password) {
              cb(errUser, dataUser)
            } else {
              return MiscHelper.errorCustomStatus(res, 'Email or password is invalid!', 400)
            }
          } else {
            return MiscHelper.errorCustomStatus(res, 'Your account is not confirm yet. Please do confirm first!', 409)
          }
        } else {
          return MiscHelper.errorCustomStatus(res, 'Email not found!', 404)
        }
      })
    },
    (user, cb) => {
      const data = {
        token: jsonwebtoken.sign({ iss: user.userid, type: 'mobile' }, CONFIG.CLIENT_SECRET, { expiresIn: CONFIG.TOKEN_EXPIRED }),
        updated_at: new Date()
      }

      usersModel.update(req, user.userid, data, (err, updateUser) => {
        user.token = data.token
        delete user.password
        delete user.salt
        cb(err, user)
      })
    }
  ], (errUser, resultUser) => {
    if (!errUser) {
      return MiscHelper.responses(res, resultUser)
    } else {
      return MiscHelper.errorCustomStatus(res, errUser, 400)
    }
  })
}

/*
 * GET : '/users/logout'
 *
 * @desc Login user account
 *
 * @param  {object} req - Parameters for request
 * @param  {object} req.headers - elearning-user userid
 *
 * @return {object} Request object
 */

exports.logout = (req, res) => {
  const userId = parseInt(req.headers['x-telkom-user'])

  if (!userId) return MiscHelper.errorCustomStatus(res, 'UserID required.', 400)

  const data = {
    token: jsonwebtoken.sign({ iss: userId, type: 'mobile' }, CONFIG.CLIENT_SECRET, { expiresIn: CONFIG.TOKEN_EXPIRED }),
    updated_at: new Date()
  }

  usersModel.update(req, userId, data, (err, updateUser) => {
    if (err || !updateUser) return MiscHelper.errorCustomStatus(res, err || 'Failed Logout.', 400)
    return MiscHelper.responses(res, 'success logout.')
  })
}

/*
 * GET : '/users/request-token'
 *
 * @desc Login user account
 *
 * @param  {object} req - Parameters for request
 * @param  {object} req.headers - userid and current-token
 *
 * @return {object} Request object
 */

exports.requestToken = (req, res) => {
  const userId = parseInt(req.headers['x-telkom-user'])
  const accessToken = req.headers['x-token-client']

  if (!userId || !accessToken) return MiscHelper.errorCustomStatus(res, 'UserID or access token required.', 400)

  async.waterfall([
    (cb) => {
      cb(null, jsonwebtoken.decode(accessToken, { complete: true }))
    },
    (token, cb) => {
      if (userId !== parseInt(_.result(token, 'payload.iss', 0))) {
        return MiscHelper.errorCustomStatus(res, 'Invalid auth token.', 400)
      } else {
        usersModel.getUserById(req, token.payload.iss, (errUser, user) => {
          if (!user || errUser) return MiscHelper.errorCustomStatus(res, errUser || 'User not exists', 409)
          const dataUser = _.result(user, '[0]')
          if (_.result(dataUser, 'token')) {
            if (dataUser.token === accessToken) {
              cb(null, dataUser)
            } else {
              return MiscHelper.errorCustomStatus(res, 'Invalid auth token.', 400)
            }
          } else {
            return MiscHelper.errorCustomStatus(res, 'Invalid auth token.', 400)
          }
        })
      }
    },
    (user, cb) => {
      const data = {
        token: jsonwebtoken.sign({ iss: user.userid, type: 'mobile' }, CONFIG.CLIENT_SECRET, { expiresIn: CONFIG.TOKEN_EXPIRED }),
        updated_at: new Date()
      }

      usersModel.update(req, user.userid, data, (err, updateUser) => {
        user.token = updateUser.token
        cb(err, user)
      })
    }
  ], (errAuth, resultAuth) => {
    if (!errAuth) {
      return MiscHelper.responses(res, resultAuth)
    } else {
      return MiscHelper.errorCustomStatus(res, errAuth, 400)
    }
  })
}

/*
 * POST : '/users/profile'
 *
 * @desc Login user account
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.body.email - email account user
 * @param  {objectId} req.body.password - password login
 * @param  {objectId} req.body.confpassword - confirm password login
 * @param  {objectId} req.body.fullname - fullname user
 * @param  {objectId} req.body.phone - phone user
 *
 * @return {object} Request object
 */

exports.profile = (req, res) => {
  req.checkBody('profile_picture', 'profile_picture is required').notEmpty()
  req.checkBody('fullname', 'fullname is required').notEmpty()
  req.checkBody('email', 'email is required').notEmpty()
  req.checkBody('newemail', 'newemail is required').notEmpty()
  req.checkBody('phone', 'phone is required').notEmpty()

  const userId = req.headers['x-telkom-user']
  const email = req.body.email
  const newemail = req.body.newemail

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      if (email !== newemail) {
        usersModel.getUserByEmail(req, newemail, (errUser, user) => {
          if (user && user.length > 0) return MiscHelper.errorCustomStatus(res, 'Email already exists, please choose another email.', 409)
          cb(errUser)
        })
      } else {
        cb(null)
      }
    },
    (cb) => {
      const data = {
        profile_picture: req.body.profile_picture,
        email: req.body.email,
        fullname: req.body.fullname,
        phone: req.body.phone,
        updated_at: new Date()
      }

      usersModel.update(req, userId, data, (err, updateUser) => {
        const key = `get-user:${userId}`

        redisCache.del(key)

        cb(err, updateUser)
      })
    }
  ], (errUser, resultUser) => {
    if (!errUser) {
      return MiscHelper.responses(res, resultUser)
    } else {
      return MiscHelper.errorCustomStatus(res, errUser, 400)
    }
  })
}

/*
 * POST : '/users/changepassword'
 *
 * @desc Login user account
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.body.oldpassword - password login
 * @param  {objectId} req.body.newpassword - password login
 * @param  {objectId} req.body.confpassword - confirm password login
 *
 * @return {object} Request object
 */

exports.changePassword = (req, res) => {
  req.checkBody('oldpassword', 'oldpassword is required').notEmpty()
  req.checkBody('newpassword', 'newpassword is required').notEmpty()
  req.checkBody('confpassword', "Confirm password don't match with password.").isMatch(req.body.newpassword)

  const userId = req.headers['x-telkom-user']

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      if (MiscHelper.validatePassword(req.body.password)) {
        cb(null)
      } else {
        return MiscHelper.errorCustomStatus(res, 'Password at least one number and both lower and uppercase letters, special characters, and length min 6 and max 16 characters.', 409)
      }
    },
    (cb) => {
      usersModel.getUserById(req, userId, (errUser, user) => {
        if (!user) return MiscHelper.notFound(res, 'user not found on our database')
        cb(errUser, user)
      })
    },
    (dataUser, cb) => {
      if (_.result(dataUser, 'salt')) {
        if (MiscHelper.setPassword(req.body.oldpassword, dataUser.salt).passwordHash === dataUser.password) {
          const salt = MiscHelper.generateSalt(18)
          const passwordHash = MiscHelper.setPassword(req.body.password, salt)
          const data = {
            password: passwordHash.passwordHash,
            salt: passwordHash.salt
          }

          usersModel.update(req, userId, data, (err, updateUser) => {
            cb(err, updateUser)
          })
        } else {
          return MiscHelper.errorCustomStatus(res, 'Invalid old password.', 409)
        }
      } else {
        return MiscHelper.errorCustomStatus(res, 'Failed change password, please contact administrator.', 409)
      }
    }
  ], (errUser, resultUser) => {
    if (!errUser) {
      return MiscHelper.responses(res, 'Password successfully changed.')
    } else {
      return MiscHelper.errorCustomStatus(res, errUser, 400)
    }
  })
}

/*
 * POST : '/users/forgot-password'
 *
 * @desc Login user account
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.body.email - email account
 *
 * @return {object} Request object
 */

exports.forgotPassword = (req, res) => {
  req.checkBody('email', 'confirm_code is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      const email = _.toLower(req.body.email)

      if (isRealEmail(email)) {
        cb(null, email)
      } else {
        return MiscHelper.errorCustomStatus(res, 'Please enter your business email.', 400)
      }
    },
    (email, cb) => {
      usersModel.getUserByEmail(req, email, (errUser, user) => {
        if (!user || _.isEmpty(user)) return MiscHelper.notFound(res, 'Email is not exists.')
        cb(errUser, _.result(user, '[0]'))
      })
    },
    (user, cb) => {
      const data = {
        status: 1,
        type: 2,
        verify_code: MiscHelper.randomNumber(4),
        userid: user.userid,
        expired_at: moment(new Date()).add(12, 'hours').format('YYYY-MM-DD HH:mm:ss'),
        created_at: new Date(),
        updated_at: new Date()
      }

      usersModel.insertAuth(req, data, (err, insertUser) => {
        user.verify_code = data.verify_code
        user.auth = insertUser
        cb(err, user)
      })
    },
    (user, cb) => {
      const dataEmail = {
        from: 'No Reply Elarka <noreply@elarka.id>',
        to: user.email,
        subject: 'Recovery your password',
        data: user,
        tpl: 'forgot-password'
      }

      mail.sendEmail(dataEmail, (err, result) => {
        cb(err, user)
      })
    }
  ], (errUser, resultUser) => {
    if (!errUser) {
      return MiscHelper.responses(res, resultUser)
    } else {
      return MiscHelper.errorCustomStatus(res, errUser, 400)
    }
  })
}

/*
 * POST : '/users/set-password'
 *
 * @desc Login user account
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.headers[x-telkom-user] - email account user
 * @param  {objectId} req.body.confirm_code - confirm code auth from email
 *
 * @return {object} Request object
 */

exports.setPasswordForgot = (req, res) => {
  const userId = parseInt(req.headers['x-telkom-user'])
  req.checkBody('verify_code', 'verify_code is required').notEmpty()
  req.checkBody('password', 'password is required').notEmpty()
  req.checkBody('confpassword', "Confirm password don't match with password.").isMatch(req.body.password)

  const verifyCode = req.body.verify_code

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      if (MiscHelper.validatePassword(req.body.password)) {
        cb(null)
      } else {
        return MiscHelper.errorCustomStatus(res, 'Password at least one number and both lower and uppercase letters, special characters, and length min 6 and max 16 characters.', 409)
      }
    },
    (cb) => {
      usersModel.getUserById(req, userId, (errUser, user) => {
        cb(errUser, _.result(user, '[0]'))
      })
    },
    (user, cb) => {
      usersModel.getAuthUser(req, userId, 2, verifyCode, (err, userAuth) => {
        if (verifyCode === _.result(userAuth, '[0].verify_code')) {
          if (moment(userAuth[0].expired_at).isSameOrBefore(new Date())) {
            return MiscHelper.errorCustomStatus(res, 'verify code has been expired.', 409)
          } else {
            cb(err, user, userAuth)
          }
        } else {
          return MiscHelper.errorCustomStatus(res, 'Invalid verify code.', 409)
        }
      })
    },
    (user, userAuth, cb) => {
      const data = {
        status: 0
      }

      usersModel.updateAuth(req, userAuth[0].id, data, (err, updateAuth) => {
        cb(err, user)
      })
    },
    (user, cb) => {
      const salt = MiscHelper.generateSalt(18)
      const passwordHash = MiscHelper.setPassword(req.body.password, salt)
      const data = {
        password: passwordHash.passwordHash,
        salt: passwordHash.salt
      }

      usersModel.update(req, userId, data, (err, updateUser) => {
        delete user.password
        delete user.salt
        cb(err, user)
      })
    }
  ], (errUser, resultUser) => {
    if (!errUser) {
      return MiscHelper.responses(res, resultUser)
    } else {
      return MiscHelper.errorCustomStatus(res, errUser, 400)
    }
  })
}

/*
 * POST : '/users/confirm'
 *
 * @desc Login user account
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.headers[x-telkom-user] - email account user
 * @param  {objectId} req.body.confirm_code - confirm code auth from email
 *
 * @return {object} Request object
 */

exports.confirm = (req, res) => {
  const userId = parseInt(req.headers['x-telkom-user'])
  req.checkBody('verify_code', 'verify code is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const verifyCode = req.body.verify_code

  async.waterfall([
    (cb) => {
      usersModel.getUserById(req, userId, (errUser, user) => {
        cb(errUser, _.result(user, '[0]'))
      })
    },
    (user, cb) => {
      usersModel.getAuthUser(req, userId, 1, verifyCode, (err, userAuth) => {
        if (verifyCode === _.result(userAuth, '[0].verify_code')) {
          if (moment(userAuth[0].expired_at).isSameOrBefore(new Date())) {
            return MiscHelper.errorCustomStatus(res, 'verify code has been expired.', 409)
          } else {
            cb(err, user, userAuth)
          }
        } else {
          return MiscHelper.errorCustomStatus(res, 'Invalid verify code.', 409)
        }
      })
    },
    (user, userAuth, cb) => {
      const data = {
        status: 0
      }

      usersModel.updateAuth(req, userAuth[0].id, data, (err, updateAuth) => {
        cb(err, user)
      })
    },
    (user, cb) => {
      if (user) {
        const data = {
          confirm: 1,
          updated_at: new Date(),
          token: jsonwebtoken.sign({ iss: user.userid, type: 'mobile' }, CONFIG.CLIENT_SECRET, { expiresIn: CONFIG.TOKEN_EXPIRED })
        }

        usersModel.update(req, user.userid, data, (err, updateUser) => {
          user.token = data.token
          user.confirm = 1
          delete user.password
          delete user.salt
          cb(err, user)
        })
      } else {
        return MiscHelper.errorCustomStatus(res, 'Invalid user.', 400)
      }
    },
    (user, cb) => {
      const dataEmail = {
        from: 'No Reply Elarka <noreply@elarka.id>',
        to: user.email,
        subject: 'Your account has been active.',
        data: user,
        tpl: 'registration-successfully'
      }

      mail.sendEmail(dataEmail, (err, result) => {
        cb(err, user)
      })
    }
  ], (errUser, resultUser) => {
    if (!errUser) {
      return MiscHelper.responses(res, resultUser)
    } else {
      return MiscHelper.errorCustomStatus(res, errUser, 400)
    }
  })
}

/*
 * POST : '/users/register'
 *
 * @desc Login user account
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.body.email - email account user
 * @param  {objectId} req.body.password - password login
 * @param  {objectId} req.body.confpassword - confirm password login
 * @param  {objectId} req.body.fullname - fullname user
 * @param  {objectId} req.body.phone - phone user
 *
 * @return {object} Request object
 */

exports.register = (req, res) => {
  req.checkBody('email', 'email is required').notEmpty()
  req.checkBody('password', 'password is required').notEmpty()
  req.checkBody('confpassword', "Confirm password don't match with password.").isMatch(req.body.password)
  req.checkBody('fullname', 'fullname is required').notEmpty()
  req.checkBody('phone', 'phone is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      const email = _.toLower(req.body.email)

      if (isRealEmail(email)) {
        cb(null, email)
      } else {
        return MiscHelper.errorCustomStatus(res, 'Please enter your business email.', 400)
      }
    },
    (email, cb) => {
      if (MiscHelper.validatePassword(req.body.password)) {
        cb(null, email)
      } else {
        return MiscHelper.errorCustomStatus(res, 'Password at least one number and both lower and uppercase letters, special characters, and length min 6 and max 16 characters.', 409)
      }
    },
    (email, cb) => {
      usersModel.getUserByEmail(req, email, (errUser, user) => {
        if (user && user.length > 0) return MiscHelper.errorCustomStatus(res, 'Email already exists, please choose another email or do forgot password.')
        cb(errUser)
      })
    },
    (cb) => {
      const salt = MiscHelper.generateSalt(18)
      const passwordHash = MiscHelper.setPassword(req.body.password, salt)
      const data = {
        email: req.body.email,
        password: passwordHash.passwordHash,
        salt: passwordHash.salt,
        fullname: req.body.fullname,
        profile_picture: '',
        token: '',
        phone: req.body.phone,
        status: 1,
        confirm: 0,
        created_at: new Date(),
        updated_at: new Date()
      }

      usersModel.insert(req, data, (err, insertUser) => {
        cb(err, insertUser)
      })
    },
    (user, cb) => {
      const data = {
        status: 1,
        type: 1,
        verify_code: MiscHelper.randomNumber(4),
        userid: user.id,
        expired_at: moment(new Date()).add(12, 'hours').format('YYYY-MM-DD HH:mm:ss'),
        created_at: new Date(),
        updated_at: new Date()
      }

      usersModel.insertAuth(req, data, (err, insertUser) => {
        user.verify_code = insertUser.verify_code
        cb(err, user)
      })
    },
    (user, cb) => {
      const dataEmail = {
        from: 'No Reply Elarka <noreply@elarka.id>',
        to: user.email,
        subject: 'Thanks for registration account',
        data: user,
        tpl: 'verify-account'
      }

      mail.sendEmail(dataEmail, (err, result) => {
        cb(err, user)
      })
    }
  ], (errUser, resultUser) => {
    if (!errUser) {
      return MiscHelper.responses(res, resultUser)
    } else {
      return MiscHelper.errorCustomStatus(res, errUser, 400)
    }
  })
}

/*
 * POST : '/users/resend-verify'
 *
 * @desc Login user account
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.body.email - email account user
 *
 * @return {object} Request object
 */

exports.resendVerify = (req, res) => {
  req.checkBody('email', 'email is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      const email = _.toLower(req.body.email)

      if (isRealEmail(email)) {
        cb(null, email)
      } else {
        return MiscHelper.errorCustomStatus(res, 'Please enter your business email.', 400)
      }
    },
    (email, cb) => {
      usersModel.getUserByEmail(req, email, (errUser, user) => {
        if (!user && user.length === 0) return MiscHelper.notFound(res, 'Email is not exists, please choose another email')
        cb(errUser, _.result(user, '[0]'))
      })
    },
    (user, cb) => {
      if (user.confirm === 0) {
        const data = {
          status: 1,
          type: 1,
          verify_code: MiscHelper.randomNumber(4),
          userid: user.userid,
          expired_at: moment(new Date()).add(12, 'hours').format('YYYY-MM-DD HH:mm:ss'),
          created_at: new Date(),
          updated_at: new Date()
        }

        usersModel.insertAuth(req, data, (err, insertUser) => {
          user.verify_code = insertUser.verify_code
          delete user.password
          delete user.token
          delete user.salt
          cb(err, user)
        })
      } else {
        return MiscHelper.errorCustomStatus(res, 'You already confirm.', 400)
      }
    },
    (user, cb) => {
      const dataEmail = {
        from: 'No Reply Elarka <noreply@elarka.id>',
        to: user.email,
        subject: 'Resend Verify Code',
        data: user,
        tpl: 'verify-account'
      }

      mail.sendEmail(dataEmail, (err, result) => {
        cb(err, user)
      })
    }
  ], (errVerify, resultVerify) => {
    if (!errVerify) {
      return MiscHelper.responses(res, resultVerify)
    } else {
      return MiscHelper.errorCustomStatus(res, errVerify, 400)
    }
  })
}

/*
 * POST : '/users/upload'
 *
 * @desc Upload avatar
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */

exports.upload = (req, res, next) => {
  if (!_.result(req.file, 'key')) {
    return MiscHelper.errorCustomStatus(res, 'Invalid file upload.', 400)
  } else {
    const dataFile = {
      file: req.file.key,
      url: CONFIG.AWS.CUSTOM_END_POINS + '/' + req.file.key
    }
    return MiscHelper.responses(res, dataFile)
  }
}
