/* global _ helpers */

'use strict'

const async = require('async')
const coursesModel = require('../../models/courses')
const redisCache = require('../../libs/RedisCache')
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
  req.checkParams('classId', 'classId is required').notEmpty()

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
 * @desc Insert Chapter to Class
 *
 * @param {object} req - Parameters for request
 * @param {integer} req.params.classId - courseid for chapter
 * @param {string} req.body.name - name for chapter
 *
 * @return {object} Request Object
 */
exports.insertDetail = (req, res) => {
  req.checkParams('classId', 'classId is required').notEmpty()
  req.checkBody('name', 'name is required').notEmpty()
  req.checkBody('assessmentid', 'assessmentid is required').notEmpty()

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
 * @desc Insert Chapter to Class
 *
 * @param {object} req - Parameters for request
 * @param {integer} req.params.classId - courseid for chapter
 * @param {integer} req.body.detailId - detailId for chapter
 *
 * @return {object} Request Object
 */

exports.updateDetail = (req, res) => {
  req.checkParams('detailId', 'detailId is required').notEmpty()
  req.checkParams('classId', 'classId is required').notEmpty()

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
 * @desc Insert Chapter to Class
 *
 * @param {object} req - Parameters for request
 * @param {integer} req.params.classId - courseid for chapter
 * @param {integer} req.body.detailId - detailId for chapter
 *
 * @return {object} Request Object
 */

exports.deleteDetail = (req, res) => {
  req.checkParams('detailId', 'detailId is required').notEmpty()
  req.checkParams('classId', 'classId is required').notEmpty()
  req.checkBody('status', 'status is required').notEmpty()

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
 * Get : '/courses/chapter/:chapterid/lecture'
 *
 * @desc Insert Chapter to Class
 *
 * @param {object} req - Parameters for request
 * @param {integer} req.params.detailId - detailId for lecture
 *
 * @return {object} Request Object
 */
exports.getMaterialList = (req, res) => {
  req.checkParams('detailId', 'detailId is required').notEmpty()

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
 * Get : '/courses/chapter/:chapterid/lecture/:lectureid'
 *
 * @desc Insert Chapter to Class
 *
 * @param {object} req - Parameters for request
 * @param {integer} req.params.chapterId - chapterId for chapter
 * @param {integer} req.params.lectureId - lectureId for lecture
 * @param {integer} req.params.classId - courseid for chapter
 *
 * @return {object} Request Object
 */
exports.getMaterialDetail = (req, res) => {
  req.checkParams('materialId', 'materialId is required').notEmpty()

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
 * POST : '/courses/chapter/:chapterId/lecture'
 *
 * @desc Insert Lecture
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
  req.cekParams('detailId', 'detailid is required').notEmpty()
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
        if (errMaterial) console.error(errMaterial)
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
 * @desc Up Chapter to Class
 *
 * @param {object} req - Parameters for request
 * @param {integer} req.params.classId - courseid for chapter
 * @param {integer} req.body.detailId - detailId for chapter
 *
 * @return {object} Request Object
 */
exports.updateMaterial = (req, res) => {
  req.checkParams('detailId', 'detailId is required').notEmpty()
  req.checkParams('materialId', 'materialId is required').notEmpty()

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
 * @desc Up Chapter to Class
 *
 * @param {object} req - Parameters for request
 * @param {integer} req.params.classId - courseid for chapter
 * @param {integer} req.body.detailId - detailId for chapter
 *
 * @return {object} Request Object
 */
exports.deleteMaterial = (req, res) => {
  req.checkParams('detailId', 'detailId is required').notEmpty()
  req.checkParams('materialId', 'materialId is required').notEmpty()
  req.checkBody('status', 'status is required')

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
