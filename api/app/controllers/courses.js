/* global _ */

'use strict'

const async = require('async')
const coursesModel = require('../models/courses')
const redisCache = require('../libs/RedisCache')
/*
 * GET : '/courses/idClass/
 *
 * @desc Get course list
 *
 * @param {object} req - Parameters for request
 *
 * @return {object} Request object
 */

exports.get = (req, res) => {
  const key = `get-courses:${req.params.idClass}:${new Date().getTime}`
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
      coursesModel.get(req, req.params.idUser, req.params.idClass, (errCourses, resultCourses) => {
        if (_.isEmpty(resultCourses)) {
          return MiscHelper.errorCustomStatus(res, { message: 'Tidak ada course untuk kelas ini' })
        } else {
          resultCourses.course.map((course) => {
            course.durasi = MiscHelper.convertDuration(course.durasi)
            if (course.is_completed === null) {
              course.is_completed = 0
            }
          })
          cb(errCourses, resultCourses)
        }
      })
    },
    (dataCourses, cb) => {
      dataCourses.pre_assessment_detail = {}
      coursesModel.getTestCourseDetail(req, dataCourses.preassessmentid, (errAssessment, resultAssessment) => {
        if (errAssessment) console.error(errAssessment)
        if (_.isEmpty(resultAssessment)) {
          dataCourses.pre_assessment_detail = 'Tidak ada Assessment'
        } else {
          dataCourses.pre_assessment_detail.single_choice = resultAssessment[0].single_choice
          dataCourses.pre_assessment_detail.essay = resultAssessment[0].essay
        }
        cb(errAssessment, dataCourses)
      })
    },
    (dataCourses, cb) => {
      dataCourses.final_assesment_detail = {}
      coursesModel.getTestCourseDetail(req, dataCourses.finalassessmentid, (errAssessment, resultAssessment) => {
        if (errAssessment) console.error(errAssessment)
        if (_.isEmpty(resultAssessment)) {
          dataCourses.final_assesment_detail = 'Tidak Ada Assesment'
        } else {
          dataCourses.final_assesment_detail.single_choice = resultAssessment[0].single_choice
          dataCourses.final_assesment_detail.essay = resultAssessment[0].essay
        }
        cb(errAssessment, dataCourses)
      })
    },
    (dataCourses, cb) => {
      coursesModel.checkTestCourseDone(req, dataCourses.preassessmentid, req.params.idUser, (errAssessment, resultAssessment) => {
        if (errAssessment) console.log(errAssessment)
        if (_.isEmpty(resultAssessment)) {
          dataCourses.pre_assessment_detail.is_done = 0
        } else {
          dataCourses.pre_assessment_detail.is_done = 1
        }
        cb(errAssessment, dataCourses)
      })
    },
    (dataCourses, cb) => {
      coursesModel.checkTestCourseDone(req, dataCourses.finalassessmentid, req.params.idUser, (errAssessment, resultAssessment) => {
        if (errAssessment) console.log(errAssessment)
        if (_.isEmpty(resultAssessment)) {
          dataCourses.final_assesment_detail.is_done = 0
        } else {
          dataCourses.final_assesment_detail.is_done = 1
        }
        cb(errAssessment, dataCourses)
      })
    }
  ],
  (errCourses, resultCourses) => {
    if (!errCourses) {
      return MiscHelper.responses(res, resultCourses)
    } else {
      return MiscHelper.errorCustomStatus(res, errCourses, 400)
    }
  })
}

/*
 * GET : '/courses/course/idCourse/
 *
 * @desc Get course detail / BAB
 *
 * @param {object} req - Parameters for request
 *
 * @return {object} Request object
 */

exports.detail = (req, res) => {
  const key = 'get-course-detail-' + req.params.idCourse
  async.waterfall([
    (cb) => {
      redisCache.get(key, details => {
        if (details) {
          return MiscHelper.responses(res, details)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      coursesModel.getDetail(req, req.params.idCourse, (errCourses, resultCourses) => {
        cb(errCourses, resultCourses)
      })
    },
    (dataDetail, cb) => {
      redisCache.setex(key, 600, dataDetail)
      console.log('process cached')
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
* GET : '/detail/idUser/idDetail
*
* @desc Get Material in BAB
*
* @param {object} req - Parameters for request
*
* @return {object} Request object
*/
exports.material = (req, res) => {
  const key = 'get-user-course-material-' + req.params.idUser + req.params.idDetail
  async.waterfall([
    (cb) => {
      redisCache.get(key, materials => {
        if (materials) {
          return MiscHelper.responses(res, materials)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      coursesModel.getMaterial(req, req.params.idUser, req.params.idDetail, (errMaterial, resultMaterial) => {
        resultMaterial.map((result) => {
          let minutes = Math.floor(result.duration / 60)
          let second = result.duration - (minutes * 60)
          result.duration = minutes + ':' + second
          if (result.is_downloaded === null) {
            result.is_downloaded = 0
          }
        })
        cb(errMaterial, resultMaterial)
      })
    },
    (dataMaterial, cb) => {
      redisCache.setex(key, 600, dataMaterial)
      console.log('process cached')
      cb(null, dataMaterial)
    }
  ],
  (errMaterial, resultMaterial) => {
    if (!errMaterial) {
      return MiscHelper.responses(res, resultMaterial)
    } else {
      return MiscHelper.errorCustomStatus(res, errMaterial, 400)
    }
  }
  )
}

/*
* GET : '/material/idMaterial
*
* @desc Get Material
*
* @param {object} req - Parameters for request
*
* @return {object} Request object
*/
exports.materialDetail = (req, res) => {
  const key = 'get-course-material-detail-' + req.params.materialDetailId
  async.waterfall([
    (cb) => {
      redisCache.get(key, materials => {
        if (materials) {
          return MiscHelper.responses(res, materials)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      coursesModel.getMaterialDetail(req, req.params.materialDetailId, req.params.userId, (errMaterialDetail, resultMaterialDetail) => {
        resultMaterialDetail.duration = MiscHelper.convertDuration(resultMaterialDetail.duration)
        resultMaterialDetail.next.map((result) => {
          let minutes = Math.floor(result.duration / 60)
          let second = result.duration - (minutes * 60)
          result.duration = minutes + ':' + second
        })
        cb(errMaterialDetail, resultMaterialDetail)
      })
    },
    (dataMaterialDetail, cb) => {
      redisCache.setex(key, 600, dataMaterialDetail)
      console.log('process cached')
      cb(null, dataMaterialDetail)
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
* GET : '/courses/detail/idDetail/material/idMaterial
*
* @desc Get Material
*
* @param {object} req - Parameters for request
*
* @return {object} Request object
*/
exports.nextMaterial = (req, res) => {
  const key = 'get-course-detail-material-' + req.params.materialDetailId
  async.waterfall([
    (cb) => {
      redisCache.get(key, materials => {
        if (materials) {
          return MiscHelper.responses(res, materials)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      const data = [req.params.idDetail, req.params.materialDetailId]
      coursesModel.getNextMaterial(req, data, (errMaterialDetail, resultMaterialDetail) => {
        cb(errMaterialDetail, resultMaterialDetail)
      })
    },
    (dataMaterialDetail, cb) => {
      redisCache.setex(key, 600, dataMaterialDetail)
      console.log('process cached')
      cb(null, dataMaterialDetail)
    }
  ], (errMaterialDetail, resultMaterialDetail) => {
    if (!errMaterialDetail) {
      return MiscHelper.responses(res, resultMaterialDetail)
    } else {
      return MiscHelper.errorCustomStatus(res, errMaterialDetail, 400)
    }
  })
}

exports.getUserCourseDetail = (req, res) => {
  async.waterfall([
    (cb) => {
      coursesModel.getCheckCourseComplete(req, req.params.detailId, (errMaterialDetail, resultMaterialDetail) => {
        let data = {}
        if (resultMaterialDetail.jumlah_materi === resultMaterialDetail.user_materi) {
          data.is_completed = 1
        } else {
          data.is_completed = 0
        }
        cb(errMaterialDetail, data)
      })
    },
    (dataDetail, cb) => {
      coursesModel.checkUserCourseDetail(req, req.params.userId, req.params.detailId, (errCheck, resultCheck) => {
        if (_.isEmpty(resultCheck) || errCheck) {
          cb(errCheck, dataDetail)
        } else {
          return MiscHelper.responses(res, resultCheck)
        }
      })
    },
    (dataDetail, cb) => {
      if (dataDetail.is_completed === 1) {
        const data = {
          userid: req.params.userId,
          detailid: req.params.detailId,
          is_completed: 1,
          created_at: new Date(),
          updated_at: new Date()
        }

        coursesModel.insertMaterialDetail(req, data, (err, result) => {
          const key = `get-user-course-detail-$:{req.params.userId}-$:req.params.detailId`
          console.log('post')
          redisCache.del(key)
          cb(err, result)
        })
      } else {
        const data = {
          userid: req.params.userId,
          detailid: req.params.detailId,
          is_completed: dataDetail.is_completed
        }
        cb(null, data)
      }
    }
  ], (errMaterialDetail, resultMaterialDetail) => {
    if (!errMaterialDetail) {
      return MiscHelper.responses(res, resultMaterialDetail)
    } else {
      return MiscHelper.errorCustomStatus(res, errMaterialDetail, 400)
    }
  })
}

exports.updateUserCourseDetail = (req, res) => {
  const userId = req.params.userId
  const detailId = req.params.detailId
  async.waterfall([
    (cb) => {
      coursesModel.checkUserCourseDetail(req, userId, detailId, (errDetail, resultDetail) => {
        if (_.isEmpty(resultDetail) || errDetail) {
          cb(errDetail)
        } else {
          cb(errDetail, resultDetail)
        }
      })
    },
    (dataDetail, cb) => {
      const data = {
        is_completed: 1,
        updated_at: new Date()
      }
      coursesModel.updateMaterialDetail(req, dataDetail[0].id, data, (errUpdateDetail, resultUpdateDetail) => {
        const key = `get-user-course-detail-$:{req.params.userId}-$:req.params.detailId`
        redisCache.del(key)
        if (errUpdateDetail) {
          cb(errUpdateDetail)
        } else {
          return MiscHelper.responses(res, resultUpdateDetail)
        }
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

exports.updateUserCourseMaterial = (req, res) => {
  async.waterfall([
    (cb) => {
      coursesModel.checkUserMaterial(req, req.params.materialId, (errMateri, resultMateri) => {
        if (_.isEmpty(resultMateri) || errMateri) {
          cb(errMateri, 1)
        } else {
          const data = {
            updated_at: new Date()
          }
          if (req.body.is_downloaded === undefined) {
            Object.assign(data, { is_done_watching: req.body.is_done_watching })
          } else if (req.body.is_done_watching === undefined) {
            Object.assign(data, { is_downloaded: req.body.is_downloaded })
          }
          coursesModel.updateUserMaterial(req, resultMateri[0].id, data, (err, result) => {
            if (err) {
              cb(err)
            } else {
              cb(err, result)
            }
          })
        }
      })
    },
    (dataMateri, cb) => {
      if (dataMateri.is_done_watching === 1) {
        coursesModel.checkCourseComplete(req, res.params.detailId, (errDetail, resultDetail) => {
          let data = {}
          if (resultDetail.jumlah_materi === resultDetail.user_materi) {
            data.is_completed = 1
          } else {
            data.is_completed = 0
          }
          cb(errDetail, data)
        })
      } else if (dataMateri.is_done_watching === 0) {
        cb(null, 1)
      }
    },
    (dataMateri, cb) => {
      if (dataMateri.is_completed === 1) {
        coursesModel.checkUserCourseDetail(req, req.params.userId, req.params.detailId, (err, result) => {
          if (_.isEmpty(result) || err) {
            const data = {
              userid: req.params.userId,
              detailId: req.params.detailId,
              is_completed: 1,
              created_at: new Date(),
              updated_at: new Date()
            }

            coursesModel.insertDetailMaterial(res, data, (err, result) => {
              const key = `get-user-course-detail-$:{req.params.userId}-$:{req.params.detailId}`
              redisCache.del(key)
              cb(err, result)
            })
          }
        })
      } else if (dataMateri.is_completed === 0) {
        const data = {
          userid: req.params.userId,
          detailid: req.params.detailId,
          is_completed: dataMateri.is_completed
        }
        return MiscHelper.responses(res, data)
      }
    }
  ], (errDetail, resultDetail) => {
    if (!errDetail) {
      return MiscHelper.responses(res, resultDetail)
    } else {
      return MiscHelper.errorCustomStatus(res, errDetail, 400)
    }
  })
}
