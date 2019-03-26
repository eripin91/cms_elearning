/* global _ helpers */

'use strict'

const async = require('async')
const redisCache = require('../../libs/RedisCache')
const coursesModel = require('../../models/courses')
const scoreModel = require('../../models/score')
const discussionModel = require('../../models/discussions')

/*
 * GET : '/courses/:courseId
 *
 * @desc Get All Course
 *
 * @param {object} req - Paramater for Request
 * @param {integer} req.params.courseId - courseId For Chapter
 *
 * @return {object} Request object
 */
exports.getCourse = (req, res) => {
  const limit = _.result(req.query, 'limit', 10)
  const offset = _.result(req.query, 'offset', 0)
  const keyword = _.result(req.query, 'keyword')
  const key = `courses-list:${limit}:${offset}:${keyword}`

  async.waterfall([
    (cb) => {
      redisCache.get(key, courses => {
        if (courses) {
          return MiscHelper.responses(res, courses)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      coursesModel.getCourse(req, limit, offset, keyword, (errCourse, resultCourse) => {
        if (_.isEmpty(resultCourse)) {
          return MiscHelper.errorCustomStatus(res, { message: 'course tidak ada' }, 400)
        } else {
          cb(errCourse, resultCourse)
        }
      })
    },
    (dataCourse, cb) => {
      async.eachSeries(dataCourse, (item, next) => {
        scoreModel.getUserTotalScore(req, item.classId, (err, result) => {
          if (err) console.error(err)

          if (_.isEmpty(result)) {
            item.avg_score = 0
          } else {
            item.avg_score = result[0].total_score / result[0].score_count
          }
        })

        discussionModel.getTotalThreadCourse(req, item.courseid, '', (err, result) => {
          if (err) console.error(err)

          if (_.isEmpty(result)) {
            item.discussion = 0
          } else {
            item.discussion = result[0].discussion
          }
        })
        next()
      }, err => {
        if (err) console.error(err)
        cb(err, dataCourse)
      })
    },
    (dataCourse, cb) => {
      coursesModel.getTotalCourse(req, keyword, (errCourse, total) => {
        if (errCourse) console.error(errCourse)
        let data = {
          data: dataCourse,
          total: total[0].total
        }
        cb(errCourse, data)
      })
    },
    (dataCourse, cb) => {
      redisCache.setex(key, 600, dataCourse)
      console.log('data cached')
      cb(null, dataCourse)
    }
  ], (errCourse, resultCourse) => {
    if (!errCourse) {
      return MiscHelper.responses(res, resultCourse)
    } else {
      return MiscHelper.errorCustomStatus(res, errCourse, 400)
    }
  })
}

exports.getAllCourses = (req, res) => {
  const key = `courses-list-all`

  async.waterfall([
    (cb) => {
      redisCache.get(key, courses => {
        if (courses) {
          return MiscHelper.responses(res, courses)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      coursesModel.getAllCourse(req, (err, result) => {
        console.log(result)
        if (_.isEmpty(result) || err) {
          return MiscHelper.errorCustomStatus(res, { message: 'not courses found' })
        } else {
          cb(err, result)
        }
      })
    },
    (dataCourse, cb) => {
      redisCache.setex(key, 600, dataCourse)
      console.log('data cached')
      cb(null, dataCourse)
    }
  ], (errCourse, resultCourse) => {
    if (!errCourse) {
      return MiscHelper.responses(res, resultCourse)
    } else {
      return MiscHelper.errorCustomStatus(res, errCourse, 400)
    }
  })
}

/*
 * GET : '/courses/:courseId/:courseId
 *
 * @desc Get detail course
 *
 * @param {object} req - Paramater for Request
 * @param {integer} req.params.courseId - courseId For Chapter
 *
 * @return {object} Request object
 */
exports.getCourseDetail = (req, res) => {
  req.checkParams('courseId', 'courseId is required')
  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const courseId = req.params.courseId
  const key = `course-detail:${courseId}`

  async.waterfall([
    (cb) => {
      redisCache.get(key, courses => {
        if (courses) {
          return MiscHelper.responses(res, courses)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      coursesModel.getCourseDetail(req, courseId, (errCourse, resultCourse) => {
        if (_.isEmpty(resultCourse)) {
          return MiscHelper.responses(res, {})
        } else {
          cb(errCourse, resultCourse[0])
        }
      })
    },
    (dataCourse, cb) => {
      redisCache.setex(key, 600, dataCourse)
      console.log('data cached')
      cb(null, dataCourse)
    }
  ], (errCourse, resultCourse) => {
    if (!errCourse) {
      return MiscHelper.responses(res, resultCourse)
    } else {
      return MiscHelper.errorCustomStatus(res, errCourse, 400)
    }
  })
}

/*
 * INSERT : '/courses/:courseId/
 *
 * @desc Insert Course
 *
 * @param {object} req - Paramater for Request
 * @param {integer} req.params.courseId - courseId For course
 * @param {string} req.params.name - name for course
 * @param {integer} req.params.preassessmentid - preassessmentid for course
 * @param {integer} req.params.finalassessmentid - finalassessmentid for course
 *
 *
 * @return {object} Request object
 */
exports.insertCourse = (req, res) => {
  req.checkBody('name', 'name is required').notEmpty()
  req.checkBody('classId', 'classId is required').notEmpty().isInt()
  req.checkBody('preAssessmentId', 'preAssessmentId is required').notEmpty().isInt()
  req.checkBody('finalAssessmentId', 'finalAssessmentId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      const data = {
        name: req.body.name,
        classid: req.body.classId,
        preassessmentid: req.body.preAssessmentId,
        finalassessmentid: req.body.finalAssessmentId,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
      coursesModel.insertCourse(req, data, (errCourse, resultCourse) => {
        redisCache.delwild('courses-list:*')
        cb(errCourse, resultCourse)
      })
    }
  ], (errCourse, resultCourse) => {
    if (!errCourse) {
      return MiscHelper.responses(res, resultCourse)
    } else {
      return MiscHelper.errorCustomStatus(res, errCourse, 400)
    }
  })
}

/*
 * Patch : '/courses/:courseId/:courseId
 *
 * @desc Get All Chapter
 *
 * @param {object} req - Paramater for Request
 * @param {integer} req.params.courseId - courseId For Chapter
 * @param {integer} req.params.courseId - courseId For Chapter
 *
 * @return {object} Request object
 */
exports.updateCourse = (req, res) => {
  req.checkParams('courseId', 'courseId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const courseId = req.params.courseId

  async.waterfall([
    (cb) => {
      coursesModel.getCourseDetail(req, courseId, (errCourse, resultCourse) => {
        if (errCourse) console.error(errCourse)

        if (_.isEmpty(resultCourse)) {
          return MiscHelper.errorCustomStatus(res, { message: 'Course Tidak ada' })
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      let data = {
        updated_at: new Date()
      }
      for (let key in req.body) {
        data[key] = req.body[key]
      }
      console.log(data)
      coursesModel.updateCourse(req, data, courseId, (errUpdateCourse, resultUpdateCourse) => {
        redisCache.delwild(`courses-list:*`)
        redisCache.del(`course-detail:${courseId}`)
        cb(errUpdateCourse, resultUpdateCourse)
      })
    }
  ], (errUpdateCourse, resultUpdateCourse) => {
    if (!errUpdateCourse) {
      return MiscHelper.responses(res, resultUpdateCourse)
    } else {
      return MiscHelper.errorCustomStatus(res, errUpdateCourse, 400)
    }
  })
}

/*
 * Patch : '/courses/:courseId/:courseId
 *
 * @desc Get All Chapter
 *
 * @param {object} req - Paramater for Request
 * @param {integer} req.params.courseId - courseId For Chapter
 *
 * @return {object} Request object
 */
exports.deleteCourse = (req, res) => {
  req.checkParams('courseId', 'courseId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const courseId = req.params.courseId

  async.waterfall([

    (cb) => {
      coursesModel.getCourseDetail(req, courseId, (errCourse, resultCourse) => {
        if (_.isEmpty(resultCourse) || errCourse) {
          return MiscHelper.errorCustomStatus(res, { message: 'Course Tidak ada' })
        } else {
          coursesModel.getDetailCourses(req, courseId, (errDetail, resultDetail) => {
            if (_.isEmpty(resultDetail) || errDetail) {
              cb(null)
            } else {
              async.eachSeries(resultDetail, (item, next) => {
                console.log(item)
                coursesModel.getMaterialCourses(req, item.detailid, (err, result) => {
                  if (_.isEmpty(result) || err) {
                    next()
                  } else {
                    coursesModel.deleteAllMaterial(req, item.detailid, (err, result) => {
                      if (err) console.error(err)
                      next()
                    })
                  }
                })
              }, err => {
                if (err) console.error(err)
                redisCache.delwild(`course-material-list:*`)
                coursesModel.deleteAllDetail(req, courseId, (errCourse) => {
                  redisCache.delwild(`courses-detail-list:*`)
                  redisCache.del(`course-detail:${courseId}`)

                  if (errCourse) console.error(errCourse)
                })
                cb(null)
              })
            }
          })
        }
      })
    },
    (cb) => {
      coursesModel.deleteCourse(req, courseId, (errUpdateCourse, resultUpdateCourse) => {
        redisCache.delwild(`courses-list:*`)

        cb(errUpdateCourse, { message: 'course deleted' })
      })
    }
  ], (errUpdateCourse, resultUpdateCourse) => {
    if (!errUpdateCourse) {
      return MiscHelper.responses(res, resultUpdateCourse)
    } else {
      return MiscHelper.errorCustomStatus(res, errUpdateCourse, 400)
    }
  })
}

/*
 * GET : '/courses/chapter/:courseId
 *
 * @desc Get All Chapter
 *
 * @param {object} req - Paramater for Request
 * @param {integer} req.params.courseId - courseId For Chapter
 *
 * @return {object} Request object
 */

exports.getDetail = (req, res) => {
  req.checkParams('courseId', 'courseId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const limit = _.result(req.query, 'limit', 10)
  const offset = _.result(req.query, 'offset', 0)
  const keyword = _.result(req.query, 'keyword')
  const courseId = req.params.courseId
  const key = `courses-detail-list:${limit}:${offset}:${keyword}`

  async.waterfall([
    (cb) => {
      redisCache.get(key, courses => {
        if (courses) {
          return MiscHelper.responses(res, courses)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      coursesModel.getDetail(req, courseId, limit, offset, keyword, (errDetail, resultDetail) => {
        if (_.isEmpty(resultDetail)) {
          return MiscHelper.responses(res, {})
        } else {
          cb(errDetail, resultDetail)
        }
      })
    },
    (dataDetail, cb) => {
      coursesModel.getTotalDetail(req, courseId, keyword, (err, total) => {
        if (err) console.error(err)
        let data = {
          data: dataDetail,
          total: total[0].total
        }
        cb(err, data)
      })
    },
    (dataDetail, cb) => {
      redisCache.setex(key, 600, dataDetail)
      console.log('data cached')
      cb(null, dataDetail)
    }
  ],
  (errDetail, resultDetail) => {
    if (!errDetail) {
      return MiscHelper.responses(res, resultDetail)
    } else {
      return MiscHelper.errorCustomStatus(res, errDetail, 400)
    }
  })
}

exports.getDetails = (req, res) => {
  req.checkParams('detailId', 'detailId is required').notEmpty().isInt()

  const detailId = req.params.detailId
  const key = `courses-details:${detailId}`

  async.waterfall([
    (cb) => {
      redisCache.get(key, courses => {
        if (courses) {
          return MiscHelper.responses(res, courses)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      coursesModel.getDetails(req, detailId, (errDetail, resultDetail) => {
        if (errDetail) console.error(errDetail)
        if (_.isEmpty(resultDetail)) {
          return MiscHelper.responses(res, {})
        }
        cb(errDetail, resultDetail)
      })
    },
    (dataDetail, cb) => {
      redisCache.setex(key, 600, dataDetail)
      console.log('data cached')
      cb(null, dataDetail)
    }
  ], (errDetail, resultDetail) => {
    if (!errDetail) {
      return MiscHelper.responses(res, resultDetail)
    } else {
      return MiscHelper.errorCustomStatus(res, errDetail, 400)
    }
  })
}

/*
 * POST : '/courses/chapter/:courseId'
 *
 * @desc Get Chapter Detail
 *
 * @param {object} req - Parameters for request
 * @param {integer} req.params.courseId - courseid for chapter
 * @param {string} req.body.name - name for chapter
 *
 * @return {object} Request Object
 */
exports.insertDetail = (req, res) => {
  req.checkBody('name', 'name is required').notEmpty()
  req.checkBody('assessmentid', 'assessmentid is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const name = req.body.name
  const assessmentid = req.body.assessmentid
  const courseId = req.params.courseId

  async.waterfall([
    (cb) => {
      coursesModel.checkCourse(req, courseId, (errCourse, resultCourse) => {
        if (_.isEmpty(resultCourse)) {
          return MiscHelper.errorCustomStatus(res, { message: 'Tidak ada course dikelas ini' })
        } else {
          cb(errCourse, resultCourse[0])
        }
      })
    },
    (dataCourse, cb) => {
      const data = {
        courseid: dataCourse.courseid,
        name: name,
        assesmentid: assessmentid,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
      coursesModel.insertDetail(req, data, (errDetail, resultDetail) => {
        if (errDetail) console.error(errDetail)
        const key = `courses-detail-list:*`
        redisCache.delwild(key)
        cb(errDetail, resultDetail)
      })
    }
  ], (errDetail, resultDetail) => {
    if (!errDetail) {
      return MiscHelper.responses(res, resultDetail)
    } else {
      return MiscHelper.errorCustomStatus(res, errDetail, 400)
    }
  })
}

/*
 * PATCH : '/courses/chapter/:courseId/:detailId'
 *
 * @desc Update Chapter
 *
 * @param {object} req - Parameters for request
 * @param {integer} req.params.courseId - courseid for chapter
 * @param {integer} req.body.detailId - detailId for chapter
 *
 * @return {object} Request Object
 */

exports.updateDetail = (req, res) => {
  req.checkParams('detailId', 'detailId is required').notEmpty().isInt()
  req.checkParams('courseId', 'courseId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }
  const detailId = req.params.detailId
  // const courseId = req.params.courseId
  async.waterfall([
    (cb) => {
      coursesModel.checkDetail(req, detailId, (errCourse, resultCourse) => {
        if (_.isEmpty(resultCourse)) {
          return MiscHelper.errorCustomStatus(res, { message: 'Chapter tidak ada' })
        } else {
          cb(errCourse)
        }
      })
    },
    (cb) => {
      let data = {
        updated_at: new Date()
      }

      for (let key in req.body) {
        data[key] = req.body[key]
      }
      delete data.detailid
      coursesModel.updateDetail(req, data, detailId, (errUpdate, resultUpdate) => {
        redisCache.delwild(`courses-detail-list:*`)
        redisCache.del(`courses-details:${detailId}`)
        cb(errUpdate, resultUpdate)
      })
    }
  ],
  (errUpdate, resultUpdate) => {
    if (!errUpdate) {
      return MiscHelper.responses(res, resultUpdate)
    } else {
      return MiscHelper.errorCustomStatus(res, errUpdate, 400)
    }
  })
}

/*
 * DELETE : '/courses/chapter/:courseId/:detailId'
 *
 * @desc Delete Chapter
 *
 * @param {object} req - Parameters for request
 * @param {integer} req.params.courseId - courseid for chapter
 * @param {integer} req.body.detailId - detailId for chapter
 *
 * @return {object} Request Object
 */

exports.deleteDetail = (req, res) => {
  req.checkParams('detailId', 'detailId is required').notEmpty().isInt()
  req.checkParams('courseId', 'courseId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }
  const detailId = req.params.detailId
  const courseId = req.params.courseId
  async.waterfall([
    (cb) => {
      coursesModel.checkDetail(req, detailId, (errCourse, resultCourse) => {
        if (_.isEmpty(resultCourse) || errCourse) {
          return MiscHelper.errorCustomStatus(res, { message: 'Chapter tidak ada' })
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      coursesModel.getMaterialCourses(req, detailId, (errMaterial, resultMaterial) => {
        if (!_.isEmpty(resultMaterial) || errMaterial) {
          coursesModel.deleteAllMaterial(req, detailId, (err) => {
            if (err) console.error(err)
            redisCache.delwild(`course-material-list:*`)
          })
        }
        coursesModel.deleteDetail(req, detailId, (errUpdate, resultUpdate) => {
          redisCache.del(`courses-detail-:${courseId}`)
          redisCache.delwild(`courses-detail-list:*`)

          cb(errUpdate, resultUpdate)
        })
      })
    }
  ],
  (errUpdate, resultUpdate) => {
    if (!errUpdate) {
      return MiscHelper.responses(res, resultUpdate)
    } else {
      return MiscHelper.errorCustomStatus(res, errUpdate, 400)
    }
  })
}

/*
 * Get : '/courses/chapter/:detailId/material'
 *
 * @desc Get Material List
 *
 * @param {object} req - Parameters for request
 * @param {integer} req.params.detailId - detailId for lecture
 *
 * @return {object} Request Object
 */
exports.getMaterialList = (req, res) => {
  req.checkParams('detailId', 'detailId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }
  const limit = _.result(req.query, 'limit', 10)
  const offset = _.result(req.query, 'offset', 0)
  const keyword = _.result(req.query, 'keyword')
  const detailId = req.params.detailId
  const key = `course-material-list:${limit}:${offset}:${keyword}`

  async.waterfall([
    (cb) => {
      redisCache.get(key, material => {
        if (material) {
          return MiscHelper.responses(res, material)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      coursesModel.checkDetail(req, detailId, (errDetail, resultDetail) => {
        if (errDetail) console.error(errDetail)
        if (_.isEmpty(resultDetail)) {
          return MiscHelper.errorCustomStatus(res, { message: 'Bab ini tidak ada' })
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      coursesModel.getMaterialList(req, detailId, limit, offset, keyword, (errMaterialList, resultMaterialList) => {
        if (errMaterialList) console.error(errMaterialList)
        cb(errMaterialList, resultMaterialList)
      })
    },
    (dataMaterial, cb) => {
      coursesModel.getTotalMaterial(req, detailId, keyword, (errMaterial, total) => {
        if (errMaterial) console.error(errMaterial)
        let data = {
          data: dataMaterial,
          total: total[0].total
        }
        cb(errMaterial, data)
      })
    },
    (dataMaterialList, cb) => {
      redisCache.setex(key, 600, dataMaterialList)
      console.log('process cached')
      cb(null, dataMaterialList)
    }
  ], (errMaterialList, resultMaterialList) => {
    if (!errMaterialList) {
      return MiscHelper.responses(res, resultMaterialList)
    } else {
      return MiscHelper.errorCustomStatus(res, errMaterialList, 400)
    }
  })
}

/*
 * Get : '/courses/chapter/:chapterid/material/:lectureid'
 *
 * @desc Get Material Detail
 *
 * @param {object} req - Parameters for request
 * @param {integer} req.params.chapterId - chapterId for chapter
 * @param {integer} req.params.lectureId - lectureId for lecture
 * @param {integer} req.params.courseId - courseid for chapter
 *
 * @return {object} Request Object
 */
exports.getMaterialDetail = (req, res) => {
  req.checkParams('materialId', 'materialId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(req.validationErrors(true))
  }
  const materialId = req.params.materialId
  const key = `course-material-detail:${materialId}`
  async.waterfall([
    (cb) => {
      redisCache.get(key, material => {
        if (material) {
          return MiscHelper.responses(res, material)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      coursesModel.getMaterialDetail(req, materialId, (errMaterialDetail, resultMaterialDetail) => {
        if (_.isEmpty(resultMaterialDetail)) {
          return MiscHelper.responses(res, { })
        } else {
          cb(errMaterialDetail, resultMaterialDetail)
        }
      })
    },
    (dataMaterial, cb) => {
      redisCache.setex(key, 600, dataMaterial)
      console.log('process cached')
      cb(null, dataMaterial)
    }
  ],
  (errMaterialDetail, resultMaterialDetail) => {
    if (!errMaterialDetail) {
      return MiscHelper.responses(res, resultMaterialDetail)
    } else {
      return MiscHelper.errorCustomStatus(res, errMaterialDetail, 400)
    }
  })
}

/*
 * POST : '/courses/chapter/:chapterId/material'
 *
 * @desc Insert Material
 *
 * @param {object} req - Parameters for request
 * @param {integer} req.params.chapterId - chapterId for lecture
 * @param {string} req.body.name - name for lecture
 * @param {integer} req.body.size - size for lecture
 * @param {string} req.body.description - description for lecture
 * @param {string} req.body.video_url - video_url for lecture
 * @param {string} req.body.thumbnails - thumbnails for lecture
 * @param {long} req.body.duration - duration for lecture
 *
 * @return {object} Request Object
 */

exports.insertMaterialDetail = (req, res) => {
  req.checkParams('detailId', 'detailid is required').notEmpty().isInt()
  // req.Body('name', 'name is required').notEmpty()
  // req.Body('description', 'description is required').notEmpty()
  // req.Body('video_url', 'video_url is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const detailId = req.params.detailId
  let dataUpload = req.dataUpload

  async.waterfall([
    (cb) => {
      if (_.isEmpty(dataUpload)) {
        return MiscHelper.errorCustomStatus(res, 'Invalid file upload')
      } else {
        cb(null)
      }
    },
    (cb) => {
      const data = {
        detailid: detailId,
        name: req.body.name,
        description: req.body.description,
        video_url: dataUpload.fileUrl,
        thumbnails: dataUpload.thumbnail,
        size: dataUpload.size,
        assessmentid: 0,
        duration: dataUpload.duration,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }

      coursesModel.insertMaterial(req, data, (errMaterial, resultMaterial) => {
        const key = `course-material-list:*`
        redisCache.delwild(key)
        cb(errMaterial, resultMaterial)
      })
    }
  ],
  (errMaterial, resultMaterial) => {
    if (!errMaterial) {
      return MiscHelper.responses(res, resultMaterial)
    } else {
      return MiscHelper.errorCustomStatus(res, errMaterial, 400)
    }
  })
}

/*
 * PATCH : '/courses/chapter/:chapterid/lecture/:lectureid'
 *
 * @desc Update material
 *
 * @param {object} req - Parameters for request
 * @param {integer} req.params.courseId - courseid for chapter
 * @param {integer} req.body.detailId - detailId for chapter
 *
 * @return {object} Request Object
 */
exports.updateMaterial = (req, res) => {
  req.checkParams('detailId', 'detailId is required').notEmpty().isInt()
  req.checkParams('materialId', 'materialId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const materialId = req.params.materialId
  let dataUpload = req.dataUpload

  async.waterfall([
    (cb) => {
      coursesModel.getMaterialDetail(req, materialId, (errMaterial, resultMaterial) => {
        if (errMaterial) console.error(errMaterial)
        if (_.isEmpty(resultMaterial)) {
          return MiscHelper.errorCustomStatus(res, { message: 'Lecture tidak ada' })
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      const data = {
        name: req.body.name,
        description: req.body.description,
        assessmentid: req.body.assessmentid,
        updated_at: new Date()
      }

      if (!_.isEmpty(dataUpload)) {
        data.video_url = dataUpload.fileUrl
        data.size = dataUpload.size
        data.duration = dataUpload.duration
        data.thumbnails = dataUpload.thumbnail
      }

      coursesModel.updateMaterial(req, data, materialId, (errUpdateMaterial, resultUpdateMaterial) => {
        redisCache.delwild(`course-material-list:*`)
        redisCache.del(`course-material-detail:${materialId}`)
        cb(errUpdateMaterial, resultUpdateMaterial)
      })
    }
  ], (errMaterial, resultMaterial) => {
    if (!errMaterial) {
      return MiscHelper.responses(res, resultMaterial)
    } else {
      return MiscHelper.errorCustomStatus(res, errMaterial, 400)
    }
  })
}

/*
 * PATCH : '/courses/chapter/:chapterid/lecture/:lectureid'
 *
 * @desc Delete Material
 *
 * @param {object} req - Parameters for request
 * @param {integer} req.params.courseId - courseid for chapter
 * @param {integer} req.body.detailId - detailId for chapter
 *
 * @return {object} Request Object
 */
exports.deleteMaterial = (req, res) => {
  req.checkParams('detailId', 'detailId is required').notEmpty().isInt()
  req.checkParams('materialId', 'materialId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const materialId = req.params.materialId

  async.waterfall([
    (cb) => {
      coursesModel.getMaterialDetail(req, materialId, (errMaterial, resultMaterial) => {
        if (_.isEmpty(resultMaterial)) {
          return MiscHelper.errorCustomStatus(res, { message: 'Lecture tidak ada' })
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      let data = {
        status: 0,
        updated_at: new Date()
      }

      coursesModel.deleteMaterial(req, materialId, data, (errUpdateMaterial, resultUpdateMaterial) => {
        redisCache.delwild(`course-material-list:*`)
        redisCache.del(`course-material-detail:${materialId}`)
        cb(errUpdateMaterial, resultUpdateMaterial)
      })
    }
  ], (errMaterial, resultMaterial) => {
    if (!errMaterial) {
      return MiscHelper.responses(res, resultMaterial)
    } else {
      return MiscHelper.errorCustomStatus(res, errMaterial, 400)
    }
  })
}
