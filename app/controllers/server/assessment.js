/* global _ helpers */

'use strict'

const async = require('async')
const assessmentModel = require('../../models/assessment')
const redisCache = require('../../libs/RedisCache')

exports.getAssessment = (req, res) => {
  const limit = _.result(req.query, 'limit', 10)
  const offset = _.result(req.query, 'offset', 0)
  const keyword = _.result(req.query, 'keyword')
  const key = `assessment-list:${limit}:${offset}:${keyword}`

  async.waterfall([
    (cb) => {
      redisCache.get(key, assessment => {
        if (assessment) {
          return MiscHelper.responses(res, assessment)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      assessmentModel.getAssessment(req, limit, offset, keyword, (errAssessment, resultAssessmnet) => {
        if (_.isEmpty(resultAssessmnet)) {
          return MiscHelper.responses(res, resultAssessmnet)
        } else {
          cb(errAssessment, resultAssessmnet)
        }
      })
    },
    (dataAssessment, cb) => {
      assessmentModel.getTotalAssessment(req, keyword, (err, total) => {
        if (err) console.error(err)

        let data = {
          data: dataAssessment,
          total: total[0].total
        }
        cb(err, data)
      })
    },
    (dataAssessment, cb) => {
      redisCache.setex(key, 600, dataAssessment)
      console.log('data cached')
      cb(null, dataAssessment)
    }
  ], (errAssessment, resultAssessmnet) => {
    if (!errAssessment) {
      return MiscHelper.responses(res, resultAssessmnet)
    } else {
      return MiscHelper.errorCustomStatus(res, errAssessment, 400)
    }
  })
}

exports.getAssessmentDetail = (req, res) => {
  req.checkParams('assessmentId', 'assessmentId is required')

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const assessmentId = req.params.assessmentId
  const key = `assessment-detail${assessmentId}`

  async.waterfall([
    (cb) => {
      redisCache.get(key, assessment => {
        if (assessment) {
          return MiscHelper.responses(res, assessment)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      assessmentModel.getAssessmentDetail(req, assessmentId, (errAssessment, resultAssessment) => {
        if (_.isEmpty(resultAssessment)) {
          return MiscHelper.errorCustomStatus(res, { message: 'Assessment not found' })
        } else {
          cb(errAssessment, resultAssessment)
        }
      })
    },
    (dataAssessment, cb) => {
      redisCache.setex(key, 600, dataAssessment)
      console.log('data cached')
      cb(null, dataAssessment)
    }
  ], (errAssessment, resultAssessment) => {
    if (!errAssessment) {
      return MiscHelper.responses(res, resultAssessment)
    } else {
      return MiscHelper.errorCustomStatus(res, errAssessment, 400)
    }
  })
}

exports.insertAssessment = (req, res) => {
  req.checkBody('parentId', 'parentId is required').notEmpty().isInt()
  req.checkBody('title', 'title is required').notEmpty()
  req.checkBody('duration', 'duration is required')
  req.checkBody('status', 'status is required')

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      const data = {
        parentid: req.body.parentId,
        title: req.body.title,
        duration: req.body.duration,
        status: req.body.status,
        created_at: new Date(),
        updated_at: new Date()
      }
      assessmentModel.insertAssessment(req, data, (errAssessment, resultAssessment) => {
        redisCache.delwild('assessment-list:*')
        cb(errAssessment, resultAssessment)
      })
    }
  ], (errAssessment, resultAssessment) => {
    if (!errAssessment) {
      return MiscHelper.responses(res, resultAssessment)
    } else {
      return MiscHelper.errorCustomStatus(res, errAssessment, 400)
    }
  })
}

exports.updateAssessment = (req, res) => {
  req.checkParams('assessmentId', 'assessmentId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const assessmentId = req.params.assessmentId

  async.waterfall([
    (cb) => {
      let data = {
        updated_at: new Date()
      }

      for (let key in req.body) {
        data[key] = req.body[key]
      }

      assessmentModel.updateAssessment(req, assessmentId, data, (errAssessment, resultAssessment) => {
        redisCache.delwild(`assessment-list:*`)
        redisCache.del(`assessment-detail${assessmentId}`)
        cb(errAssessment, resultAssessment)
      })
    }
  ], (errAssessment, resultAssessment) => {
    if (!errAssessment) {
      return MiscHelper.responses(res, resultAssessment)
    } else {
      return MiscHelper.errorCustomStatus(res, errAssessment, 400)
    }
  })
}

exports.deleteAssessment = (req, res) => {
  req.checkParams('assessmentId', 'assessmentId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const assessmentId = req.params.assessmentId
  async.waterfall([
    (cb) => {
      assessmentModel.deleteAssessment(req, assessmentId, (errDelete, resultDelete) => {
        redisCache.delwild(`assessment-list:*`)
        redisCache.del(`assessment-detail${assessmentId}`)
        cb(errDelete, resultDelete)
      })
    }
  ], (errAssessment, resultAssessment) => {
    if (!errAssessment) {
      return MiscHelper.responses(res, resultAssessment)
    } else {
      return MiscHelper.errorCustomStatus(res, errAssessment, 400)
    }
  })
}
