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

  if(req.validationErrors()) {
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
        updated_at: new Date(),
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
          return MiscHelper.errorCustomStatus(res, { message: 'Chapter tidak ada'})
        } else {
          cb(null, resultCourse[0].courseid)
        }
      })
    },
    (cb) => {
      let data = {
        updated_at = new Date()
      
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