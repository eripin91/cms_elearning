/* global CONFIG, _, redisCache */

'use strict'

const uuidV4 = require('uuid/v4')

module.exports = {
  errorCustomStatus: (res, err, status) => {
    let resultPrint = {}
    resultPrint.id = uuidV4()
    resultPrint.status = _.result(err, 'status') || 400
    resultPrint.errors = {}

    if (_.isObject(err)) {
      resultPrint.errors.message = _.result(err, 'message') || _.result(err, 'msg') || 'Bad Request'
      resultPrint.errors.fields = err
    } else {
      resultPrint.status = status || resultPrint.status
      resultPrint.message = err
      resultPrint.errors.message = err || 'The server encountered an unexpected condition which prevented it from fulfilling the request.'
    }

    return res.status(resultPrint.status).json(resultPrint)
  },
  notFound: (res, message) => {
    let resultPrint = {}
    resultPrint.id = uuidV4()
    resultPrint.errors = {
      message: message || 'Sorry, that page does not exist'
    }
    resultPrint.status = 404
    return res.status(404).json(resultPrint)
  },
  responses: (res, obj, status, extra) => {
    var resultPrint = {}

    resultPrint.id = uuidV4()
    resultPrint.status = status || 200

    if (_.isObject(obj)) {
      resultPrint.data = obj
    } else {
      resultPrint.message = obj
    }

    if (_.isObject(extra)) {
      Object.assign(resultPrint, extra)
    }

    return res.status(resultPrint.status).json(resultPrint)
  },
  setPassword: (password, salt) => {
    const crypto = require('crypto')
    const key = crypto.scryptSync(password, salt, 24)
    const iv = Buffer.alloc(16, 0)
    const cipher = crypto.createCipheriv('aes-192-cbc', key, iv)
    let encrypted = cipher.update(CONFIG.CHIPPER, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return {
      salt: salt,
      passwordHash: encrypted
    }
  },
  generateSalt: (length) => {
    const crypto = require('crypto')
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length)
  },
  randomNumber: (length) => {
    return parseInt(Math.floor((Math.random() * 999999) + 1000000).toString().slice(0, length))
  },
  validatePassword: (password) => {
    var patt = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,15}$/
    return patt.test(password)
  },
  validate_email: (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  },
  set_error_msg: (arr, sesId) => {
    redisCache.setex(`__msg${sesId}`, 10, arr)
  },
  getActionButton: (urlPrefix, id) => {
    let action = '<a href="' + urlPrefix + '/' + urlPrefix + '_update/' + id + '"><i class="fa fa-pencil"></i></a>'
    action += ' <a href="' + urlPrefix + '/' + urlPrefix + '_delete/' + id + '" onclick="return confirm(\'Are you sure you want to delete this item?\');"><i class="fa fa-times"></i></a>'
    return action
  },
  getStatus: (status, type) => {
    if (type === 1) { return (status === 1 ? 'Active' : 'Inactive') } else { return (status === 1 ? 'Active <input type="radio" checked="checked" name="status" value="1" /> Inactive <input type="radio" name="status" value="0" />' : 'Active <input type="radio" name="status" value="1" /> Inactive <input type="radio" checked="checked" name="status" value="0" />') }
  },
  getConfirm: (status) => {
    return (status === 1 ? 'Confirmed' : 'Unconfirm')
  },
  get_error_msg: async (sesId) => {
    const data = await redisCache.v2_get(`__msg${sesId}`).catch(err => console.error(err))
    if (!data) return ''
    const css = data.error ? 'danger' : 'success'
    let resE = ''
    if (data.error || data.info) {
      let msg = data.error ? data.error : data.info
      resE += '<div class="alert alert-' + css + ' alert-dismissable"><i class="fa fa-' + (css === 'success' ? 'check' : 'ban') + '"></i> &nbsp <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'
      resE += msg
      resE += '</div>'
      redisCache.del(`__msg${sesId}`)
    }
    return resE
  }
}
