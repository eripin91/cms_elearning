'use strict'

const ApiLibs = require('../../libs/API')
const async = require('async')

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
  res.render('users')
}

/*
 * GET : '/ajax/get'
 *
 * @desc Get dashboard home
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */
exports.ajaxGet = async (req, res) => {
  API_SERVICE.get('v1/users/get', {limit: _.result(req.query, 'length', 25), offset: _.result(req.query, 'start', 0), keyword: req.query.search['value']}, (err, response) => {
  	const dataUsers = []
  	async.eachSeries(_.result(response, 'data', {}), (item, next) => {
			item.action = MiscHelper.getActionButton('users', item.userid)
			item.confirm = MiscHelper.getConfirm(item.confirm)
			dataUsers.push(item)
			next()
  	}, err => {
	    if (!err) {
	    	const data = {
	    		draw: _.result(req.query, 'draw', 1),
	    		recordsTotal: response.total,
	    		recordsFiltered: response.total
	    	}
	      return MiscHelper.responses(res, dataUsers, 200, data)
	    } else {
	      return MiscHelper.errorCustomStatus(res, err, 400)
	    }
  	})
  })
}
