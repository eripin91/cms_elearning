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
  res.render('courses', { errorMsg: errorMsg })
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
  API_SERVICE.get(
    'v1/courses',
    {
      limit: _.result(req.query, 'length', 25),
      offset: _.result(req.query, 'start', 0),
      keyword: req.query.search['value']
    },
    (err, response) => {
      const dataCourses = []
      if (!err) {
        async.eachSeries(
          _.result(response.data, 'data', {}),
          (item, next) => {
            item.action = MiscHelper.getActionButtonFull(
              'courses',
              item.courseid
            )
            item.name = `<a href="courses/chapter/${item.courseid}">${item.name}</a>`
            item.status = MiscHelper.getStatus(item.status, 1)
            item.created_at = moment(item.created_at).format('DD/MM/YYYY hh:mm')
            dataCourses.push(item)
            next()
          },
          err => {
            if (!err) {
              const data = {
                draw: _.result(req.query, 'draw', 1),
                recordsTotal: _.result(response, 'total', 0),
                recordsFiltered: _.result(response, 'total', 0)
              }

              return MiscHelper.responses(res, dataCourses, 200, data)
            } else {
              return MiscHelper.errorCustomStatus(res, err, 400)
            }
          }
        )
      } else {
        return MiscHelper.errorCustomStatus(
          res,
          err,
          _.result(err, 'status', 400)
        )
      }
    }
  )
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
    const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
    res.render('courses_add', { errorMsg: errorMsg })
  } else {
    const email = req.body.email
    const nick = req.body.nick
    const password = req.body.password
    const confpassword = req.body.confpassword

    if (!email || !nick || !password) {
      MiscHelper.set_error_msg(
        { error: 'Data yang anda masukkan tidak lengkap !!!' },
        req.sessionID
      )
      res.redirect('/admin/add')
    } else if (password !== confpassword) {
      MiscHelper.set_error_msg(
        { error: 'Password dan konfimasi password tidak sesuai !!!' },
        req.sessionID
      )
      res.redirect('/admin/add')
    } else {
      API_SERVICE.post('v1/admin/create', req.body, (err, response) => {
        if (!err) {
          MiscHelper.set_error_msg(
            { info: 'Admin berhasil ditambahkan.' },
            req.sessionID
          )
          res.redirect('/admin')
        } else {
          MiscHelper.set_error_msg({ error: response.message }, req.sessionID)
          res.redirect('/admin/add')
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
 * @param  {object} req.body.courseId - courseId for identifier
 *
 * @return {object} Request object
 */
exports.update = async (req, res) => {
  if (_.isEmpty(req.body)) {
    const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
    API_SERVICE.get(
      'v1/courses/' + req.params.courseId,
      {},
      (err, response) => {
        if (err) console.error(err)
        res.render('course_update', { errorMsg: errorMsg, data: response.data })
      }
    )
  } else {
    const courseId = req.body.courseid
    const classid = req.body.classid
    const name = req.body.name
    const preassessmentid = req.body.preassessmentid
    const finalassessmentid = req.body.finalassessmentid

    if (!courseId) {
      MiscHelper.set_error_msg(
        { error: 'Kesalahan input data !!!' },
        req.sessionID
      )
      res.redirect('/courses')
    } else {
      if (!classid) {
        MiscHelper.set_error_msg(
          { error: 'Class Id wajib di isi !!!' },
          req.sessionID
        )
        res.redirect('/courses/update/' + courseId)
      } else if (!name) {
        MiscHelper.set_error_msg(
          { error: 'Name wajib di isi !!!' },
          req.sessionID
        )
        res.redirect('/courses/update/' + courseId)
      } else if (!preassessmentid) {
        MiscHelper.set_error_msg(
          { error: 'Pre Assessment Id wajib di isi !!!' },
          req.sessionID
        )
        res.redirect('/courses/update/' + courseId)
      } else if (!finalassessmentid) {
        MiscHelper.set_error_msg(
          { error: 'Final Assessment Id wajib di isi !!!' },
          req.sessionID
        )
        res.redirect('/courses/update/' + courseId)
      } else {
        API_SERVICE.patch(
          'v1/courses/' + courseId,
          req.body,
          (err, response) => {
            if (!err) {
              MiscHelper.set_error_msg(
                { info: 'Courses berhasil diubah.' },
                req.sessionID
              )
              res.redirect('/courses')
            } else {
              MiscHelper.set_error_msg({ error: err.message }, req.sessionID)
              res.redirect('/courses/update/' + courseId)
            }
          }
        )
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
 * @param  {object} req.params.courseId - Parameters courseId for identifier
 *
 * @return {object} Request object
 */
exports.delete = async (req, res) => {
  const courseId = 0 || req.params.courseId
  if (!courseId) {
    MiscHelper.set_error_msg({ error: 'courseId required !!!' }, req.sessionID)
    res.redirect('/admin')
  } else {
    API_SERVICE.get('v1/admin/delete/' + courseId, {}, (err, response) => {
      if (err) {
        MiscHelper.set_error_msg({ error: err }, req.sessionID)
      } else {
        MiscHelper.set_error_msg(
          { info: 'Admin berhasil dihapus.' },
          req.sessionID
        )
        res.redirect('/admin')
      }
    })
  }
}

// CHAPTER =====================================================

exports.chapterMain = async (req, res) => {
  const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
  res.render('chapters', { errorMsg: errorMsg, courseId: req.params.courseId })
}

/*
 * GET : '/chapter/courseId'
 *
 * @desc Ajax get chapter list
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */
exports.chapterGetAll = async (req, res) => {
  API_SERVICE.get(
    'v1/courses/chapter/' + req.params.courseId,
    {
      limit: _.result(req.query, 'length', 25),
      offset: _.result(req.query, 'start', 0),
      keyword: req.query.search['value']
    },
    (err, response) => {
      const dataChapters = []
      if (!err) {
        async.eachSeries(
          _.result(response.data, 'data', {}),
          (item, next) => {
            item.action = `<a href="update/${req.params.courseId}/${item.detailid}"><i class="fa fa-pencil"></i></a>`
            item.action += `  <a href="delete/${req.params.courseId}/${item.detailid}" onclick="return confirm('Are you sure you want to delete this item?');"><i class="fa fa-times"></i></a>`
            item.name = `<a href="${item.detailid}/lecture">${item.name}</a>`
            item.assessment_title = item.assessment_title === null ? 'Belum ada test' : item.assessment_title
            dataChapters.push(item)
            next()
          },
          err => {
            if (!err) {
              const data = {
                draw: _.result(req.query, 'draw', 1),
                recordsTotal: _.result(response, 'total', 0),
                recordsFiltered: _.result(response, 'total', 0)
              }

              return MiscHelper.responses(res, dataChapters, 200, data)
            } else {
              return MiscHelper.errorCustomStatus(res, err, 400)
            }
          }
        )
      } else {
        return MiscHelper.errorCustomStatus(
          res,
          err,
          _.result(err, 'status', 400)
        )
      }
    }
  )
}

/*
 * GET && POST : '/add'
 *
 * @desc Add chapter
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */
exports.chapterAdd = async (req, res) => {
  if (_.isEmpty(req.body)) {
    const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
    res.render('chapter_add', { errorMsg: errorMsg, courseId: req.params.courseId })
  } else {
    const name = req.body.name
    const assessmentid = req.body.assessmentid

    if (!name || !assessmentid) {
      MiscHelper.set_error_msg(
        { error: 'Data yang anda masukkan tidak lengkap !!!' },
        req.sessionID
      )
      res.redirect('/courses/chapter/add/' + req.params.courseId)
    } else {
      API_SERVICE.post(`v1/courses/chapter/${req.params.courseId}`, req.body, (err, response) => {
        if (!err) {
          MiscHelper.set_error_msg(
            { info: 'Chapter berhasil ditambahkan.' },
            req.sessionID
          )
          res.redirect(`/courses/chapter/${req.params.courseId}`)
        } else {
          MiscHelper.set_error_msg({ error: response.message }, req.sessionID)
          res.redirect('/admin/add')
        }
      })
    }
  }
}

/*
 * GET && POST : '/chapterupdate'
 *
 * @desc Update admin
 *
 * @param  {object} req - for request
 * @param  {object} req.body.courseId - courseId for identifier
 *
 * @return {object} Request object
 */
exports.chapterUpdate = async (req, res) => {
  if (_.isEmpty(req.body)) {
    const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
    API_SERVICE.get(
      'v1/courses/chapter/detail/' + req.params.chapterId,
      {},
      (err, response) => {
        if (err) console.error(err)
        res.render('chapter_update', { errorMsg: errorMsg, data: response.data[0], courseId: req.params.courseId, chapterId: req.params.chapterid })
      }
    )
  } else {
    const chapterId = req.body.detailid
    const courseId = req.params.courseId
    const name = req.body.name
    const assessmentid = req.body.assesmentid

    if (!chapterId) {
      MiscHelper.set_error_msg(
        { error: 'Kesalahan input data !!!' },
        req.sessionID
      )
      res.redirect('/courses/chapter')
    } else {
      if (!name) {
        MiscHelper.set_error_msg(
          { error: 'Name wajib di isi !!!' },
          req.sessionID
        )
        res.redirect(`/courses/chapter/update/${courseId}/${chapterId}`)
      } else if (!assessmentid) {
        MiscHelper.set_error_msg(
          { error: 'Assessment Id wajib di isi !!!' },
          req.sessionID
        )
        res.redirect(`/courses/chapter/update/${courseId}/${chapterId}`)
      } else {
        API_SERVICE.patch(
          `v1/courses/chapter/${courseId}/${chapterId}`,
          req.body,
          (err, response) => {
            if (!err) {
              MiscHelper.set_error_msg(
                { info: 'Courses berhasil diubah.' },
                req.sessionID
              )
              res.redirect(`/courses/chapter/${courseId}`)
            } else {
              MiscHelper.set_error_msg({ error: err.message }, req.sessionID)
              res.redirect(`/courses/chapter/${courseId}/`)
            }
          }
        )
      }
    }
  }
}

/*
 * GET : '/chapter/delete/:courseId/:chapterId'
 *
 * @desc Get dashboard home
 *
 * @param  {object} req - Parameters for request
 * @param  {object} req.params.courseId - Parameters courseId for identifier
 *
 * @return {object} Request object
 */
exports.chapterDelete = async (req, res) => {
  const courseId = 0 || req.params.courseId
  const chapterId = 0 || req.params.chapterId
  if (!courseId || !chapterId) {
    MiscHelper.set_error_msg({ error: 'courseId & chapterId required !!!' }, req.sessionID)
    res.redirect('/courses')
  } else {
    API_SERVICE.get('v1/courses/chapter/delete/' + courseId, {}, (err, response) => {
      if (err) {
        MiscHelper.set_error_msg({ error: err }, req.sessionID)
      } else {
        MiscHelper.set_error_msg(
          { info: 'Admin berhasil dihapus.' },
          req.sessionID
        )
        res.redirect('/admin')
      }
    })
  }
}
