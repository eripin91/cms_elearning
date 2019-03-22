/* global _ helpers */

'use strict'

const async = require('async')
const scoreModel = require('../../models/score')
const courseModel = require('../../models/courses')
const redisCache = require('../../libs/RedisCache')

exports.getusersScore = (req, res) => {
  req.checkParams('courseId', 'courseId is required')

  // if (req.valdationErrors()) {
  //   return MiscHelper.errorCustomStatus(res, req.valdationErrors(true))
  // }

  const limit = _.result(req.query, 'limit', 10)
  const offset = _.result(req.query, 'offset', 0)
  const keyword = _.result(req.query, 'keyword')
  const key = `user-score-list${limit}:${offset}:${keyword}`

  const courseId = req.params.courseId
  async.waterfall([
    (cb) => {
      redisCache.get(key, score => {
        if (score) {
          return MiscHelper.responses(res, score)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      courseModel.getCourseDetail(req, courseId, (errCourse, resultCourse) => {
        if (_.isEmpty(resultCourse)) {
          return MiscHelper.errorCustomStatus(res, { message: 'Course not found' })
        } else {
          cb(errCourse, resultCourse)
        }
      })
    },
    (dataCourse, cb) => {
      scoreModel.getUserScore(req, dataCourse[0].classid, limit, offset, keyword, (errUserScore, resultUserScore) => {
        if (_.isEmpty(resultUserScore)) {
          return MiscHelper.errorCustomStatus(res, { message: 'no user in this class' })
        } else {
          let data = {
            courseId: courseId,
            classId: dataCourse[0].classid,
            users: resultUserScore
          }
          cb(errUserScore, data)
        }
      })
    },
    (dataUsers, cb) => {
      scoreModel.getUserTotalScore(req, dataUsers.classId, (errScore, resultScore) => {
        let data = {
          data: dataUsers.users,
          total_users: resultScore[0].score_count,
          total_score: resultScore[0].total_score,
          average: resultScore[0].total_score / resultScore[0].score_count
        }
        cb(errScore, data)
      })
    },
    (dataUsers, cb) => {
      redisCache.setex(key, 600, dataUsers)
      console.log('data cached')
      cb(null, dataUsers)
    }
  ], (errUsers, resultUsers) => {
    if (!errUsers) {
      return MiscHelper.responses(res, resultUsers)
    } else {
      return MiscHelper.errorCustomStatus(res, errUsers, 400)
    }
  })
}
