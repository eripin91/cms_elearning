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
 * @desc Get course list view
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */
exports.main = async (req, res) => {
  const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
  res.render('classes', { errorMsg: errorMsg })
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
  API_SERVICE.get('v1/classes/get', { limit: _.result(req.query, 'length', 25), offset: _.result(req.query, 'start', 0), keyword: req.query.search['value'] }, (err, response) => {
    if (!err) {
      const dataClasses = []
      async.eachSeries(_.result(response, 'data', {}), (item, next) => {
        item.action = MiscHelper.getActionButtonClasses('classes', 'users', item.classid)
        item.created_at = moment(item.created_at).format('DD/MM/YYYY hh:mm')
        dataClasses.push(item)
        next()
      }, err => {
        if (!err) {
          const data = {
            draw: _.result(req.query, 'draw', 1),
            recordsTotal: _.result(response, 'total', 0),
            recordsFiltered: _.result(response, 'total', 0)
          }

          return MiscHelper.responses(res, dataClasses, 200, data)
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
 * @desc Add admin
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */
exports.add = async (req, res) => {
  if (_.isEmpty(req.body)) {
    API_SERVICE.get('v1/guru/get', { limit: 1000, offset: 0, keyword: '' }, async (err, guru) => {
      if (err) console.error(err)
      const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
      res.render('class_add', { errorMsg: errorMsg, selectGuru: MiscHelper.getGuru(guru.data, 0) })
    })
  } else {
    const guruid = req.body.guruid
    const name = req.body.name
    const description = req.body.description
    const priority = req.body.priority
    const cover = req.body.cover

    if (!guruid || !name || !description || !priority || !cover) {
      MiscHelper.set_error_msg({ error: 'Data yang anda masukkan tidak lengkap !!!' }, req.sessionID)
      res.redirect('/classes/add')
    } else {
      API_SERVICE.post('v1/classes/add', req.body, (err, response) => {
        if (!err) {
          MiscHelper.set_error_msg({ info: 'Class berhasil ditambahkan.' }, req.sessionID)
          res.redirect('/classes')
        } else {
          MiscHelper.set_error_msg({ error: response.message }, req.sessionID)
          res.redirect('/classes/add')
        }
      })
    }
  }
}

/*
 * GET && POST : '/update'
 *
 * @desc Update admin
 *
 * @param  {object} req - for request
 * @param  {object} req.body.classId - classId for identifier
 *
 * @return {object} Request object
 */
exports.update = async (req, res) => {
  if (_.isEmpty(req.body)) {
    const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
    async.waterfall([
      (cb) => {
        API_SERVICE.get('v1/classes/get/' + req.params.classId, {}, (err, response) => {
          cb(err, response)
        })
      },
      (classDetail, cb) => {
        API_SERVICE.get('v1/guru/get', { limit: 1000, offset: 0, keyword: '' }, async (err, guru) => {
          cb(err, classDetail, guru)
        })
      }
    ], (err, classDetail, guru) => {
      if (err) console.error(err)
      res.render('class_update', {
        errorMsg: errorMsg,
        data: classDetail.data[0],
        selectGuru: MiscHelper.getGuru(guru.data, _.result(classDetail, 'data[0].guruid', 0))
      })
    })
  } else {
    const classId = req.body.classid
    const guruid = req.body.guruid
    const name = req.body.name
    const description = req.body.description
    const cover = req.body.cover
    const priority = req.body.priority
    const rating = req.body.rating

    if (!classId) {
      MiscHelper.set_error_msg({ error: 'Kesalahan input data !!!' }, req.sessionID)
      res.redirect('/classes')
    } else {
      if (!guruid) {
        MiscHelper.set_error_msg({ error: 'Guru id wajib di isi !!!' }, req.sessionID)
        res.redirect('/classes/update/' + classId)
      } else if (!name) {
        MiscHelper.set_error_msg({ error: 'Nama wajib di isi !!!' }, req.sessionID)
        res.redirect('/classes/update/' + classId)
      } else if (!description) {
        MiscHelper.set_error_msg({ error: 'Description wajib di isi !!!' }, req.sessionID)
        res.redirect('/classes/update/' + classId)
      } else if (!cover) {
        MiscHelper.set_error_msg({ error: 'Cover wajib di isi !!!' }, req.sessionID)
        res.redirect('/classes/update/' + classId)
      } else if (!priority) {
        MiscHelper.set_error_msg({ error: 'Priority wajib di isi !!!' }, req.sessionID)
        res.redirect('/classes/update/' + classId)
      } else if (!rating) {
        MiscHelper.set_error_msg({ error: 'Rating wajib di isi !!!' }, req.sessionID)
        res.redirect('/classes/update/' + classId)
      } else {
        delete req.body.file
        API_SERVICE.patch('v1/classes/update/' + classId, req.body, (err, response) => {
          if (!err) {
            MiscHelper.set_error_msg({ info: 'Class berhasil diubah.' }, req.sessionID)
            res.redirect('/classes')
          } else {
            MiscHelper.set_error_msg({ error: err.message }, req.sessionID)
            res.redirect('/classes/update/' + classId)
          }
        })
      }
    }
  }
}

/*
 * GET : '/delete'
 *
 * @desc Get dashboard home
 *
 * @param  {object} req - Parameters for request
 * @param  {object} req.params.classId - Parameters classId for identifier
 *
 * @return {object} Request object
 */
exports.delete = async (req, res) => {
  const classId = 0 || req.params.classId
  if (!classId) {
    console.log('ERROR CLASSID NOT FOUND!')
    MiscHelper.set_error_msg({ error: 'classId required !!!' }, req.sessionID)
    res.redirect('/classes')
  } else {
    console.log('DELETING CLASS')
    API_SERVICE.delete('v1/classes/delete/' + classId, {}, (err, response) => {
      if (err) {
        MiscHelper.set_error_msg({ error: err }, req.sessionID)
        res.redirect('/classes')
      } else {
        MiscHelper.set_error_msg(
          { info: 'Class berhasil dihapus.' },
          req.sessionID
        )
        res.redirect('/classes')
      }
    })
  }
}
