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
  res.render('assessment', { errorMsg: errorMsg })
}

/*
 * GET : '/ajax/get'
 *
 * @desc Ajax get course list
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */
exports.ajaxGet = async (req, res) => {
  API_SERVICE.get('v1/assessment', { limit: _.result(req.query, 'length', 25), offset: _.result(req.query, 'start', 0), keyword: req.query.search['value'] }, (err, response) => {
    if (!err) {
      const dataAssessment = []
      async.eachSeries(_.result(response, 'data', {}), (item, next) => {
        item.action = MiscHelper.getActionButtonFull('assessment', item.assessmentid)
        item.created_at = moment(item.created_at).format('DD/MM/YYYY hh:mm')
        item.updated_at = moment(item.updated_at).format('DD/MM/YYYY hh:mm')
        dataAssessment.push(item)
        next()
      }, err => {
        if (!err) {
          const data = {
            draw: _.result(req.query, 'draw', 1),
            recordsTotal: _.result(response, 'total', 0),
            recordsFiltered: _.result(response, 'total', 0)
          }

          return MiscHelper.responses(res, dataAssessment, 200, data)
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
 * @desc Add assessment
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */
exports.add = async (req, res) => {
  if (_.isEmpty(req.body)) {
    const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
    res.render('assessment_add', { errorMsg: errorMsg })
  } else {

  }
}

/*
 * GET && POST : '/update'
 *
 * @desc Update assessment
 *
 * @param  {object} req - for request
 * @param  {object} req.body.assessmentId - assessmentId for identifier
 *
 * @return {object} Request object
 */
exports.update = async (req, res) => {
  if (_.isEmpty(req.body)) {
    const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
    API_SERVICE.get('v1/assessment/' + req.params.assessmentId, {}, (err, response) => {
      if (err) console.error(err)
      res.render('assessment_update', { errorMsg: errorMsg, data: response.data })
    })
  } else {

  }
}

/*
 * GET : '/delete/:assessmentId'
 *
 * @desc Get dashboard home
 *
 * @param  {object} req - Parameters for request
 * @param  {object} req.params.assessmentId - Parameters assessmentId for identifier
 *
 * @return {object} Request object
 */
exports.delete = async (req, res) => {
  const assessmentId = 0 || req.params.assessmentId
  if (!assessmentId) {
    MiscHelper.set_error_msg({ error: 'assessmentId required !!!' }, req.sessionID)
    res.redirect('/assessment')
  } else {
    API_SERVICE.get('v1/assessment/delete/' + assessmentId, {}, (err, response) => {
      if (err) {
        MiscHelper.set_error_msg({ error: err }, req.sessionID)
      } else {
        MiscHelper.set_error_msg({ info: 'Assessment berhasil dihapus.' }, req.sessionID)
        res.redirect('/assessment')
      }
    })
  }
}
