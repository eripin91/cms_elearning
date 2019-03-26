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
        item.course_name = item.course_name ? item.course_name : '-'
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
    const title = req.body.title
    const duration = req.body.duration

    if (!title || !duration) {
      MiscHelper.set_error_msg({ error: 'Title dan duration wajib di isi !!!' }, req.sessionID)
      res.redirect('/assessment/add')
    } else {
      const dataAssessment = {
        title: title,
        duration: duration,
        status: 1,
        parentId: 0
      }
      const dataQuestions = []
      for (let i = 0; i < _.size(req.body.question); ++i) {
        if (!_.isEmpty(req.body.question[i])) {
          let dataQu = {
            question: req.body.question[i],
            answer: req.body.answer[i],
            options: []
          }

          for (let y = 0; y < _.size(req.body.options[i]); ++y) {
            dataQu.options.push({
              label: req.body.options[i][y],
              _id: (y + 1),
              isAnswer: parseInt(req.body.answer[i]) === (y + 1)
            })
          }
          dataQu.options = JSON.stringify(dataQu.options)
          dataQuestions.push(dataQu)
        }
      }
      dataAssessment.question = dataQuestions
      API_SERVICE.post('v1/assessment/create', dataAssessment, (err, response) => {
        if (!err) {
          MiscHelper.set_error_msg({ info: 'Assessment berhasil ditambahkan.' }, req.sessionID)
          res.redirect('/assessment')
        } else {
          MiscHelper.set_error_msg({ error: response.message }, req.sessionID)
          res.redirect('/assessment/add')
        }
      })
    }
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
      for (let i = 0; i < _.size(_.result(response, 'data.question', [])); ++i) {
        if (_.result(response.data, 'question[' + i + '].options', '[]')) {
          response.data.question[i].options = JSON.parse(_.result(response.data, 'question[' + i + '].options', '[]'))
        }
      }

      if (err) console.error(err)
      res.render('assessment_update', { errorMsg: errorMsg, totalIncQuestion: _.size(_.result(response, 'data.question', [])), data: _.result(response, 'data', {}) })
    })
  } else {
    const assessmentId = req.body.id
    const title = req.body.title
    const duration = req.body.duration

    if (!assessmentId) {
      MiscHelper.set_error_msg({ error: 'Kesalahan input data !!!' }, req.sessionID)
      res.redirect('/assessment')
    } else {
      if (!title || !duration) {
        MiscHelper.set_error_msg({ error: 'Title dan duration wajib di isi !!!' }, req.sessionID)
        res.redirect('/assessment/add')
      } else {
        const dataAssessment = {
          title: title,
          duration: duration,
          status: 1,
          parentId: 0
        }
        const dataQuestions = []
        for (let i = 0; i < _.size(req.body.question); ++i) {
          if (!_.isEmpty(req.body.question[i])) {
            let dataQu = {
              detailid: parseInt(_.result(req.body, 'detailid[' + i + ']', 0)),
              question: req.body.question[i],
              answer: parseInt(_.result(req.body, 'answer[' + i + ']', 0)),
              options: []
            }

            for (let y = 0; y < _.size(req.body.options[i]); ++y) {
              dataQu.options.push({
                label: req.body.options[i][y],
                _id: (y + 1),
                isAnswer: parseInt(req.body.answer[i]) === (y + 1)
              })
            }
            dataQu.options = JSON.stringify(dataQu.options)
            dataQuestions.push(dataQu)
          }
        }

        dataAssessment.question = dataQuestions

        API_SERVICE.post('v1/assessment/update/' + assessmentId, dataAssessment, (err, response) => {
          if (!err) {
            MiscHelper.set_error_msg({ info: 'Assessment berhasil diubah.' }, req.sessionID)
            res.redirect('/assessment')
          } else {
            MiscHelper.set_error_msg({ error: err.message }, req.sessionID)
            res.redirect('/assessment/update/' + assessmentId)
          }
        })
      }
    }
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

/*
 * GET : '/delete/question/:assessmentId/:detailId'
 *
 * @desc Get dashboard home
 *
 * @param  {object} req - Parameters for request
 * @param  {object} req.params.assessmentId - Parameters assessmentId for identifier
 * @param  {object} req.params.detailId - Parameters detailId for identifier
 *
 * @return {object} Request object
 */
exports.deleteQuestion = async (req, res) => {
  const detailId = 0 || req.params.detailId
  const assessmentId = 0 || req.params.assessmentId
  if (!detailId || !assessmentId) {
    MiscHelper.set_error_msg({ error: 'detailId required !!!' }, req.sessionID)
    res.redirect('/assessment')
  } else {
    API_SERVICE.get('v1/assessment/question/delete/' + detailId, {}, (err, response) => {
      if (err) {
        MiscHelper.set_error_msg({ error: err }, req.sessionID)
        res.redirect('/assessment')
      } else {
        MiscHelper.set_error_msg({ info: 'Assessment berhasil dihapus.' }, req.sessionID)
        res.redirect('/assessment/update/' + assessmentId)
      }
    })
  }
}
