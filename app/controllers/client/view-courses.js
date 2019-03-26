'use strict'

const ApiLibs = require('../../libs/API')
const async = require('async')
const moment = require('moment')
const fs = require('fs')
const request = require('request')

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
  API_SERVICE.get('v1/courses', { limit: _.result(req.query, 'length', 25), offset: _.result(req.query, 'start', 0), keyword: req.query.search['value'] }, (err, response) => {
    const dataCourses = []
    if (!err) {
      async.eachSeries(_.result(response.data, 'data', {}), (item, next) => {
        item.action = MiscHelper.getActionButtonCourse('courses', 'discussions', item.courseid)
        item.name = `<a href="/courses/chapter/${item.courseid}">${item.name}</a>`
        item.status = MiscHelper.getStatus(item.status, 1)
        item.created_at = moment(item.created_at).format('DD/MM/YYYY hh:mm')
        dataCourses.push(item)
        next()
      }, err => {
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
    const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
    async.parallel({
      assessment: (callback) => {
        API_SERVICE.get('v1/assessment/select', {}, (err, assessment) => {
          callback(err, _.result(assessment, 'data'))
        })
      },
      classes: (callback) => {
        API_SERVICE.get('v1/classes/get?keyword=&limit=50', {}, (err, classes) => {
          callback(err, _.result(classes, 'data'))
        })
      }
    }, (err, result) => {
      if (err) console.error(err)
      res.render('course_add', { errorMsg: errorMsg, classList: result.classes, selectData: MiscHelper.getSelect(result.assessment, 0) })
    })
  } else {
    const classId = req.body.classId
    const name = req.body.name
    const preAssessmentId = req.body.preAssessmentId
    const finalAssessmentId = req.body.finalAssessmentId

    if (!classId || !name || !preAssessmentId || !finalAssessmentId) {
      MiscHelper.set_error_msg({ error: 'Data yang anda masukkan tidak lengkap !!!' }, req.sessionID)
      res.redirect('/courses/add')
    } else {
      API_SERVICE.post('v1/courses', req.body, (err, response) => {
        if (!err) {
          MiscHelper.set_error_msg({ info: 'Course berhasil ditambahkan.' }, req.sessionID)
          res.redirect('/courses')
        } else {
          MiscHelper.set_error_msg({ error: response.message }, req.sessionID)
          res.redirect('/courses/add')
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
    const options = {
      url: CONFIG.SERVER.BASE_WEBHOST + 'v1/classes/get?keyword=&limit=50',
      headers: CONFIG.REQUEST_HEADERS
    }
    async.waterfall([
      cb => {
        request(options, function (error, response, body) {
          if (error) {
            console.log('ERROR GET SINGLE COURSE')
          }
          cb(null, JSON.parse(body).data)
        })
      },
      (classList, cb) => {
        API_SERVICE.get('v1/courses/' + req.params.courseId, {}, (err, courses) => {
          cb(err, classList, _.result(courses, 'data'))
        })
      },
      (classList, courses, cb) => {
        API_SERVICE.get('v1/assessment/select', {}, (err, assessment) => {
          cb(err, classList, courses, _.result(assessment, 'data'))
        })
      }
    ], (err, classList, courses, assessment) => {
      if (err) console.error(err)
      res.render('course_update', { errorMsg: errorMsg, data: courses, classList, prevClassId: courses.classid, selectDataPre: MiscHelper.getSelect(assessment, courses.preassessmentid), selectDataFinal: MiscHelper.getSelect(assessment, courses.finalassessmentid) })
    })
  } else {
    const courseId = req.body.courseid
    const classid = req.body.classid
    const name = req.body.name
    const preassessmentid = req.body.preassessmentid
    const finalassessmentid = req.body.finalassessmentid

    if (!courseId) {
      MiscHelper.set_error_msg({ error: 'Kesalahan input data !!!' }, req.sessionID)
      res.redirect('/courses')
    } else {
      if (!classid) {
        MiscHelper.set_error_msg({ error: 'Class Id wajib diisi !!!' }, req.sessionID)
        res.redirect('/courses/update/' + courseId)
      } else if (!name) {
        MiscHelper.set_error_msg({ error: 'Name wajib diisi !!!' }, req.sessionID)
        res.redirect('/courses/update/' + courseId)
      } else if (!preassessmentid) {
        MiscHelper.set_error_msg({ error: 'Pre Assessment Id wajib diisi !!!' }, req.sessionID)
        res.redirect('/courses/update/' + courseId)
      } else if (!finalassessmentid) {
        MiscHelper.set_error_msg({ error: 'Final Assessment Id wajib diisi !!!' }, req.sessionID)
        res.redirect('/courses/update/' + courseId)
      } else {
        API_SERVICE.patch('v1/courses/' + courseId, req.body, (err, response) => {
          if (!err) {
            MiscHelper.set_error_msg({ info: 'Courses berhasil diubah.' }, req.sessionID)
            res.redirect('/courses')
          } else {
            MiscHelper.set_error_msg({ error: err.message }, req.sessionID)
            res.redirect('/courses/update/' + courseId)
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
 * @param  {object} req.params.courseId - Parameters courseId for identifier
 *
 * @return {object} Request object
 */
exports.delete = async (req, res) => {
  const courseId = 0 || req.params.courseId
  if (!courseId) {
    MiscHelper.set_error_msg({ error: 'courseId required !!!' }, req.sessionID)
    res.redirect(`/courses`)
  } else {
    API_SERVICE.delete(`v1/courses/${courseId}`, {}, (err, response) => {
      if (err) {
        MiscHelper.set_error_msg({ error: err }, req.sessionID)
      } else {
        MiscHelper.set_error_msg({ info: 'Course berhasil dihapus.' }, req.sessionID)
        res.redirect(`/courses`)
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
  API_SERVICE.get('v1/courses/chapter/' + req.params.courseId, { limit: _.result(req.query, 'length', 25), offset: _.result(req.query, 'start', 0), keyword: req.query.search['value'] }, (err, response) => {
    const dataChapters = []
    if (!err) {
      async.eachSeries(_.result(response.data, 'data', {}), (item, next) => {
        item.action = `<a href="update/${req.params.courseId}/${item.detailid}"><i class="fa fa-pencil"></i></a>`
        item.action += `  <a href="delete/${req.params.courseId}/${item.detailid}" onclick="return confirm('Are you sure you want to delete this item?');"><i class="fa fa-times"></i></a>`
        item.name = `<a href="${item.detailid}/lecture">${item.name}</a>`
        item.assessment_title = item.assessment_title === null ? 'Belum ada test' : item.assessment_title
        dataChapters.push(item)
        next()
      }, err => {
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
      })
    } else {
      return MiscHelper.errorCustomStatus(res, err, _.result(err, 'status', 400))
    }
  })
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
    API_SERVICE.get('v1/assessment/select', {}, async (err, assessment) => {
      if (err) console.error(err)
      const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
      res.render('chapter_add', { errorMsg: errorMsg, selectData: MiscHelper.getSelect(assessment.data, 0), courseId: req.params.courseId })
    })
  } else {
    const name = req.body.name
    const assessmentid = req.body.assesmentid

    if (!name || !assessmentid) {
      MiscHelper.set_error_msg({ error: 'Data yang anda masukkan tidak lengkap !!!' }, req.sessionID)
      res.redirect('/courses/chapter/add/' + req.params.courseId)
    } else {
      API_SERVICE.post(`v1/courses/chapter/${req.params.courseId}`, req.body, (err, response) => {
        if (!err) {
          MiscHelper.set_error_msg({ info: 'Chapter berhasil ditambahkan.' }, req.sessionID)
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
    async.waterfall([
      (cb) => {
        API_SERVICE.get('v1/courses/chapter/detail/' + req.params.chapterId, {}, (err, response) => {
          cb(err, response)
        })
      },
      (courses, cb) => {
        API_SERVICE.get('v1/assessment/select', {}, async (err, assessment) => {
          cb(err, courses, assessment)
        })
      }
    ], (err, response, assessmentSelect) => {
      if (err) console.error(err)
      res.render('chapter_update', { errorMsg: errorMsg, selectData: MiscHelper.getSelect(assessmentSelect.data, _.result(response, 'data[0].assesmentid', 0)), data: response.data[0], courseId: req.params.courseId, chapterId: req.params.chapterid })
    })
  } else {
    const chapterId = req.body.detailid
    const courseId = req.params.courseId
    const name = req.body.name
    const assessmentid = req.body.assesmentid
    if (!chapterId) {
      MiscHelper.set_error_msg({ error: 'Kesalahan input data !!!' }, req.sessionID)
      res.redirect('/courses/chapter')
    } else {
      if (!name) {
        MiscHelper.set_error_msg({ error: 'Name wajib diisi !!!' }, req.sessionID)
        res.redirect(`/courses/chapter/update/${courseId}/${chapterId}`)
      } else if (!assessmentid) {
        MiscHelper.set_error_msg({ error: 'Assessment Id wajib diisi !!!' }, req.sessionID)
        res.redirect(`/courses/chapter/update/${courseId}/${chapterId}`)
      } else {
        API_SERVICE.patch(`v1/courses/chapter/${courseId}/${chapterId}`, req.body, (err, response) => {
          if (!err) {
            MiscHelper.set_error_msg({ info: 'Courses berhasil diubah.' }, req.sessionID)
            res.redirect(`/courses/chapter/${courseId}`)
          } else {
            MiscHelper.set_error_msg({ error: err.message }, req.sessionID)
            res.redirect(`/courses/chapter/${courseId}/`)
          }
        })
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
    res.redirect(`/courses/chapter/${courseId}`)
  } else {
    API_SERVICE.delete(`v1/courses/chapter/${courseId}/${chapterId}`, {}, (err, response) => {
      if (err) {
        MiscHelper.set_error_msg({ error: err }, req.sessionID)
      } else {
        MiscHelper.set_error_msg({ info: 'Chapter berhasil dihapus.' }, req.sessionID)
        res.redirect(`/courses/chapter/${courseId}`)
      }
    })
  }
}

// LECTURE =====================================================

exports.lectureMain = async (req, res) => {
  const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
  res.render('lectures', { errorMsg: errorMsg, chapterId: req.params.chapterId })
}

/*
 * GET : '/chapter/:chapterId/lecture/ajax/get'
 *
 * @desc Ajax get chapter list
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */
exports.lectureGetAll = async (req, res) => {
  API_SERVICE.get(`v1/courses/chapter/${req.params.chapterId}/material`, { limit: _.result(req.query, 'length', 25), offset: _.result(req.query, 'start', 0), keyword: req.query.search['value'] }, (err, response) => {
    const dataLectures = []
    if (!err) {
      async.eachSeries(_.result(response.data, 'data', {}), (item, next) => {
        item.action = `<a href="update/${item.materialid}"><i class="fa fa-pencil"></i></a>`
        item.action += `  <a href="delete/${item.materialid}" onclick="return confirm('Are you sure you want to delete this item?');"><i class="fa fa-times"></i></a>`
        item.status = MiscHelper.getStatus(item.status, 1)
        item.duration = MiscHelper.convertDuration(item.duration)
        item.size = MiscHelper.sizeCount(item.size)
        dataLectures.push(item)
        next()
      }, err => {
        if (!err) {
          const data = {
            draw: _.result(req.query, 'draw', 1),
            recordsTotal: _.result(response, 'total', 0),
            recordsFiltered: _.result(response, 'total', 0)
          }

          return MiscHelper.responses(res, dataLectures, 200, data)
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
 * @desc Add lecture
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */
exports.lectureAdd = async (req, res) => {
  if (_.isEmpty(req.body)) {
    const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
    res.render('lecture_add', { errorMsg: errorMsg, chapterId: req.params.chapterId })
  } else {
    const name = req.body.name
    const detailid = req.body.detailid
    const description = req.body.description

    if (!name || !detailid || !description) {
      MiscHelper.set_error_msg({ error: 'Data yang anda masukkan tidak lengkap !!!' }, req.sessionID)
      res.redirect('/courses/chapter/' + req.params.chapterId + '/add/')
    } else if (!req.file) {
      MiscHelper.set_error_msg({ error: 'Video harus di isi !!!' }, req.sessionID)
      res.redirect('/courses/chapter/' + req.params.chapterId + '/add/')
    } else {
      const formData = {
        name: name,
        detailid: detailid,
        description: description,
        file: fs.createReadStream(req.file.path)
      }

      API_SERVICE.postFormData(`v1/courses/chapter/${req.params.chapterId}/material`, formData, (err, response) => {
        if (!err) {
          console.log(response)
          MiscHelper.set_error_msg({ info: 'Lecture berhasil ditambahkan.' }, req.sessionID)
          res.redirect('/courses/chapter/' + req.params.chapterId + '/lecture/')
        } else {
          MiscHelper.set_error_msg({ error: response.message }, req.sessionID)
          res.redirect('/courses/chapter/' + req.params.chapterId + '/lecture/')
        }
      })
    }
  }
}

/*
 * GET && POST : '/lectureupdate'
 *
 * @desc Update lecture
 *
 * @param  {object} req - for request
 * @param  {object} req.body.chapterId - chapterId for identifier
 *
 * @return {object} Request object
 */
exports.lectureUpdate = async (req, res) => {
  if (_.isEmpty(req.body)) {
    const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
    API_SERVICE.get(`v1/courses/chapter/${req.params.chapterId}/material/${req.params.lectureId}`, {}, (err, response) => {
      if (err) console.error(err)
      res.render('lecture_update', { errorMsg: errorMsg, data: response.data[0], chapterId: req.params.chapterId, lectureId: req.params.lectureId })
    })
  } else {
    const chapterId = req.body.detailid
    const materialid = req.body.materialid
    const name = req.body.name
    const assessmentid = req.body.assessmentid
    const description = req.body.description

    if (!chapterId || !materialid) {
      MiscHelper.set_error_msg({ error: 'Kesalahan input data !!!' }, req.sessionID)
      res.redirect(`/courses/chapter/${req.params.chapterId}/lecture`)
    } else {
      if (!name) {
        MiscHelper.set_error_msg({ error: 'Name wajib diisi !!!' }, req.sessionID)
        res.redirect(`/courses/chapter/${req.params.chapterId}/update/${req.params.lectureId}`)
      } else if (!assessmentid) {
        MiscHelper.set_error_msg({ error: 'Assessment Id wajib diisi !!!' }, req.sessionID)
        res.redirect(`/courses/chapter/${req.params.chapterId}/update/${req.params.lectureId}`)
      } else if (!description) {
        MiscHelper.set_error_msg({ error: 'Description wajib diisi !!!' }, req.sessionID)
        res.redirect(`/courses/chapter/${req.params.chapterId}/update/${req.params.lectureId}`)
      } else {
        const formData = {
          name: name,
          detailid: chapterId,
          description: description,
          assessmentid: assessmentid
        }

        if (req.file) {
          formData.file = fs.createReadStream(req.file.path)
        }

        API_SERVICE.postFormData(`v1/courses/chapter/${req.params.chapterId}/material/${req.params.lectureId}`, formData, (err, response) => {
          if (!err) {
            MiscHelper.set_error_msg({ info: 'Lecture berhasil diubah.' }, req.sessionID)
            res.redirect(`/courses/chapter/${req.params.chapterId}/lecture`)
          } else {
            MiscHelper.set_error_msg({ error: err.message }, req.sessionID)
            res.redirect(`/courses/chapter/${req.params.chapterId}/lecture`)
          }
        })
      }
    }
  }
}

/*
 * GET : '/chapter/delete/:chapterId/:chapterId'
 *
 * @desc Get dashboard home
 *
 * @param  {object} req - Parameters for request
 * @param  {object} req.params.chapterId - Parameters chapterId for identifier
 *
 * @return {object} Request object
 */
exports.lectureDelete = async (req, res) => {
  const chapterId = 0 || req.params.chapterId
  const lectureId = 0 || req.params.lectureId
  if (!chapterId || !lectureId) {
    MiscHelper.set_error_msg({ error: 'chapterId & lectureId required !!!' }, req.sessionID)
    res.redirect(`/courses/chapter/${chapterId}/lecture`)
  } else {
    API_SERVICE.delete(`v1/courses/chapter/${chapterId}/material/${lectureId}`, {}, (err, response) => {
      if (err) {
        MiscHelper.set_error_msg({ error: err }, req.sessionID)
      } else {
        MiscHelper.set_error_msg({ info: 'Lecture berhasil dihapus.' }, req.sessionID)
        res.redirect(`/courses/chapter/${chapterId}/lecture`)
      }
    })
  }
}
