/* global _ helpers */

'use strict'

const async = require('async')
const coursesModel = require('../../models/courses')
const redisCache = require('../../libs/RedisCache')

/*
 * GET : '/courses/:classId
 *
 * @desc Get All Course
 *
 * @param {object} req - Paramater for Request
 * @param {integer} req.params.classId - classId For Chapter
 *
 * @return {object} Request object
 */
exports.getCourse = (req, res) => {
  req.checkParams('classId', 'classId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const classId = req.params.classId
  const key = `courses-:${classId}`

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
      coursesModel.getCourse(req, classId, (errCourse, resultCourse) => {
        if (_.isEmpty(resultCourse)) {
          return MiscHelper.errorCustomStatus(res, { message: 'Tidak ada Course di class ini' })
        } else {
          cb(errCourse, resultCourse)
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
 * GET : '/courses/:classId/:courseId
 *
 * @desc Get detail course
 *
 * @param {object} req - Paramater for Request
 * @param {integer} req.params.classId - classId For Chapter
 *
 * @return {object} Request object
 */
exports.getCourseDetail = (req, res) => {
  req.checkParams('classId', 'classId is required').notEmpty().isInt()
  req.checkParams('courseId', 'classId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const courseId = req.params.courseId
  const key = `get-course-detail:${courseId}`

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
          return MiscHelper.errorCustomStatus(res, { message: 'Course ini tidak tersedia' })
        } else {
          cb(errCourse, resultCourse)
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
 * INSERT : '/courses/:classId/
 *
 * @desc Insert Course
 *
 * @param {object} req - Paramater for Request
 * @param {integer} req.params.classId - classId For course
 * @param {string} req.params.name - name for course
 * @param {integer} req.params.preassessmentid - preassessmentid for course
 * @param {integer} req.params.finalassessmentid - finalassessmentid for course
 *
 *
 * @return {object} Request object
 */
exports.insertCourse = (req, res) => {
  req.checkParams('classId', 'classId is required').notEmpty().isInt()
  req.checkBody('name', 'name is required').notEmpty()
  req.checkBody('preassessmentid', 'preassessmentid is required').notEmpty().isInt()
  req.checkBody('finalassessmentid', 'finalassessment is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const classId = req.params.classId

  async.waterfall([
    (cb) => {
      const data = {
        classid: classId,
        name: req.body.name,
        preassessmentid: req.body.preassessmentid,
        finalassessmentid: req.body.finalassessmentid,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
      coursesModel.insertCourse(req, data, (errCourse, resultCourse) => {
        const key = `courses-:${classId}`
        redisCache.del(key)
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
 * Patch : '/courses/:classId/:courseId
 *
 * @desc Get All Chapter
 *
 * @param {object} req - Paramater for Request
 * @param {integer} req.params.classId - classId For Chapter
 * @param {integer} req.params.courseId - courseId For Chapter
 *
 * @return {object} Request object
 */
exports.updateCourse = (req, res) => {
  req.checkParams('classId', 'classId is required').notEmpty().isInt()
  req.checkParams('courseId', 'courseId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const classId = req.params.classId
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

      coursesModel.updateDetail(req, data, courseId, (errUpdateCourse, resultUpdateCourse) => {
        redisCache.del(`courses-:${classId}`)
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
 * Patch : '/courses/:classId/:courseId
 *
 * @desc Get All Chapter
 *
 * @param {object} req - Paramater for Request
 * @param {integer} req.params.classId - classId For Chapter
 *
 * @return {object} Request object
 */
exports.deleteDetail = (req, res) => {
  req.checkParams('classId', 'classId is required').notEmpty().isInt()
  req.checkParams('courseId', 'courseId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const classId = req.params.classId
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
        status: 0,
        updated_at: new Date()
      }

      coursesModel.updateDetail(req, data, courseId, (errUpdateCourse, resultUpdateCourse) => {
        redisCache.del(`courses-:${classId}`)
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
 * GET : '/courses/chapter/:classId
 *
 * @desc Get All Chapter
 *
 * @param {object} req - Paramater for Request
 * @param {integer} req.params.classId - classId For Chapter
 *
 * @return {object} Request object
 */

exports.getDetail = (req, res) => {
  req.checkParams('classId', 'classId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const classId = req.params.classId
  const key = `courses-detail-:${classId}`

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
      coursesModel.getDetail(req, classId, (errDetail, resultDetail) => {
        if (_.isEmpty(resultDetail)) {
          return MiscHelper.errorCustomStatus(res, { message: 'Tidak ada chapter untuk class ini' })
        } else {
          cb(errDetail, resultDetail)
        }
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

/*
 * POST : '/courses/chapter/:classId'
 *
 * @desc Get Chapter Detail
 *
 * @param {object} req - Parameters for request
 * @param {integer} req.params.classId - courseid for chapter
 * @param {string} req.body.name - name for chapter
 *
 * @return {object} Request Object
 */
exports.insertDetail = (req, res) => {
  req.checkParams('classId', 'classId is required').notEmpty().isInt()
  req.checkBody('name', 'name is required').notEmpty()
  req.checkBody('assessmentid', 'assessmentid is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const classId = req.params.classId
  const name = req.body.name
  const assessmentid = req.body.assessmentid

  async.waterfall([
    (cb) => {
      coursesModel.checkCourse(req, classId, (errCourse, resultCourse) => {
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
        const key = `courses-detail-:${classId}`
        redisCache.del(key)
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
 * PATCH : '/courses/chapter/:classId/:detailId'
 *
 * @desc Update Chapter
 *
 * @param {object} req - Parameters for request
 * @param {integer} req.params.classId - courseid for chapter
 * @param {integer} req.body.detailId - detailId for chapter
 *
 * @return {object} Request Object
 */

exports.updateDetail = (req, res) => {
  req.checkParams('detailId', 'detailId is required').notEmpty().isInt()
  req.checkParams('classId', 'classId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }
  const detailId = req.params.detailId
  const classId = req.params.classId
  async.waterfall([
    (cb) => {
      coursesModel.checkCourse(req, detailId, (errCourse, resultCourse) => {
        if (_.isEmpty(resultCourse) || errCourse) {
          return MiscHelper.errorCustomStatus(res, { message: 'Chapter tidak ada' })
        } else {
          cb(null, resultCourse[0].courseid)
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

      coursesModel.updateDetail(req, data, detailId, (errUpdate, resultUpdate) => {
        redisCache.del(`courses-detail-:${classId}`)
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
 * DELETE : '/courses/chapter/:classId/:detailId'
 *
 * @desc Delete Chapter
 *
 * @param {object} req - Parameters for request
 * @param {integer} req.params.classId - courseid for chapter
 * @param {integer} req.body.detailId - detailId for chapter
 *
 * @return {object} Request Object
 */

exports.deleteDetail = (req, res) => {
  req.checkParams('detailId', 'detailId is required').notEmpty().isInt()
  req.checkParams('classId', 'classId is required').notEmpty().isInt()
  req.checkBody('status', 'status is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }
  const detailId = req.params.detailId
  const classId = req.params.classId
  async.waterfall([
    (cb) => {
      coursesModel.checkCourse(req, detailId, (errCourse, resultCourse) => {
        if (_.isEmpty(resultCourse) || errCourse) {
          return MiscHelper.errorCustomStatus(res, { message: 'Chapter tidak ada' })
        } else {
          cb(null, resultCourse[0].courseid)
        }
      })
    },
    (cb) => {
      let data = {
        status: req.body.status,
        updated_at: new Date()
      }
      coursesModel.updateDetail(req, data, detailId, (errUpdate, resultUpdate) => {
        redisCache.del(`courses-detail-:${classId}`)
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
  const detailId = req.params.detailId
  const key = `course-material-list:${detailId}`
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
      coursesModel.getMaterialList(req, detailId, (errMaterialList, resultMaterialList) => {
        if (_.isEmpty(resultMaterialList)) {
          return MiscHelper.errorCustomStatus(res, { message: 'Tidak ada lecture untuk chapter ini' })
        } else {
          cb(errMaterialList, resultMaterialList)
        }
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
 * @param {integer} req.params.classId - courseid for chapter
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
          return MiscHelper.errorCustomStatus(res, { message: 'Maaf lecture ini belum tersedia' })
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
  req.cekParams('detailId', 'detailid is required').notEmpty().isInt()
  req.checkBody('name', 'name is required').notEmpty()
  req.checkBody('size', 'size is required').notEmpty()
  req.checkBody('description', 'description is required').notEmpty()
  req.checkBody('video_url', 'video_url is required').notEmpty()
  req.checkBody('thumbnails', 'thumbnails is required').notEmpty()
  req.checkBody('duration', 'duration is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const detailId = req.params.detailId

  async.waterfall([
    (cb) => {
      const data = {
        detailid: detailId,
        name: req.body.name,
        description: req.body.description,
        video_url: req.body.video_url,
        thumbnails: req.body.thumbnails,
        size: req.body.size,
        duration: req.body.duration,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
      coursesModel.insertMaterial(req, data, (errMaterial, resultMaterial) => {
        const key = `course-material-list:${detailId}`
        redisCache.del(key)
        cb(errMaterial, resultMaterial)
      },
      (errMaterial, resultMaterial) => {
        if (!errMaterial) {
          return MiscHelper.responses(res, resultMaterial)
        } else {
          return MiscHelper.errorCustomStatus(res, errMaterial, 400)
        }
      })
    }
  ])
}

/*
 * PATCH : '/courses/chapter/:chapterid/lecture/:lectureid'
 *
 * @desc Update material
 *
 * @param {object} req - Parameters for request
 * @param {integer} req.params.classId - courseid for chapter
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

  const detailId = req.parms.detailId
  const materialId = req.params.materialId

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
      let data = {
        updated_at: new Date()
      }
      for (let key in req.body) {
        data[key] = req.body[key]
      }

      coursesModel.updateDetail(req, data, materialId, (errUpdateMaterial, resultUpdateMaterial) => {
        redisCache.del(`course-material-list:${detailId}`)
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
 * @param {integer} req.params.classId - courseid for chapter
 * @param {integer} req.body.detailId - detailId for chapter
 *
 * @return {object} Request Object
 */
exports.deleteMaterial = (req, res) => {
  req.checkParams('detailId', 'detailId is required').notEmpty().isInt()
  req.checkParams('materialId', 'materialId is required').notEmpty().isInt()
  req.checkBody('status', 'status is required').isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const detailId = req.parms.detailId
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
        status: req.body.status,
        updated_at: new Date()
      }
      for (let key in req.body) {
        data[key] = req.body[key]
      }

      coursesModel.updateDetail(req, data, materialId, (errUpdateMaterial, resultUpdateMaterial) => {
        redisCache.del(`course-material-list:${detailId}`)
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
