'use strict'

const ApiLibs = require('../../libs/API')

const API_SERVICE = ApiLibs.client({
  baseUrl: CONFIG.SERVER.BASE_WEBHOST,
  headers: CONFIG.REQUEST_HEADERS
})

/*
 * GET : '/'
 *
 * @desc Get dashboard home
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */
exports.main = async (req, res) => {
  // res.render('index')
  const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
  API_SERVICE.get('v1/dashboard', {}, (err, response) => {
    if (err) console.error(err)
    res.render('index', { errorMsg: errorMsg, data: response.data })
    console.log(response.user)
  })
}

exports.getData = async (req, res) => {
  const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
  API_SERVICE.get('v1/dashboard', {}, (err, response) => {
    if (err) console.error(err)
    res.render('index', { errorMsg: errorMsg, data: response.data })
    console.log(response.user)
  })
}
