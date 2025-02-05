/* global _ helpers */

'use strict'

const async = require('async')
const assessmentModel = require('../../models/assessment')
const redisCache = require('../../libs/RedisCache')

exports.getAssessment = (req, res) => {
  const limit = _.result(req.query, 'limit', 10)
  const offset = _.result(req.query, 'offset', 0)
  const keyword = _.result(req.query, 'keyword')
  const key = `assessment-list:${limit}:${offset}:${keyword}` + new Date().getTime()

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
      return MiscHelper.responses(res, resultAssessmnet.data, 200, { total: resultAssessmnet.total })
    } else {
      return MiscHelper.errorCustomStatus(res, errAssessment, 400)
    }
  })
}

exports.getAssessmentSelect = (req, res) => {
  const key = `assessment-select` + new Date().getTime()

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
      assessmentModel.getAssessmentSelect(req, (errAssessment, resultAssessmnet) => {
        if (_.isEmpty(resultAssessmnet)) {
          return MiscHelper.responses(res, resultAssessmnet)
        } else {
          cb(errAssessment, resultAssessmnet)
        }
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
  req.checkParams('assessmentId', 'assessmentId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const assessmentId = req.params.assessmentId
  const key = `assessment-detail${assessmentId}` + new Date().getTime()

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
          cb(errAssessment, _.result(resultAssessment, '[0]', {}))
        }
      })
    },
    (resultAssessment, cb) => {
      assessmentModel.getQuestions(req, resultAssessment.assessmentid, (errQuestion, questions) => {
        resultAssessment.question = JSON.parse(JSON.stringify(questions))
        cb(errQuestion, resultAssessment)
      })
    },
    (dataAssessment, cb) => {
      redisCache.setex(key, 600, dataAssessment)
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

exports.getAssessmentCourse = (req, res) => {
  req.checkParams('courseId', 'courseId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const courseId = req.params.courseId
  const key = `assessment-course-list:${courseId}`

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
      assessmentModel.getAssessmentByCourse(req, courseId, (err, result) => {
        if (_.isEmpty(result)) {
          return MiscHelper.responses(res, { message: 'belum ada asssessment' })
        } else {
          cb(err, result)
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
  req.checkBody('duration', 'duration is required').notEmpty()
  req.checkBody('status', 'status is required').notEmpty()

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
    },
    (assessment, cb) => {
      const questions = []
      for (let i = 0; i < _.size(req.body.question); i++) {
        let dataQuestion = {
          assessmentid: assessment.id,
          question_type: 'single-choice',
          question: req.body.question[i].question,
          answer: req.body.question[i].answer,
          status: 1,
          options: req.body.question[i].options,
          created_at: new Date(),
          updated_at: new Date()
        }

        questions.push(dataQuestion)
        assessmentModel.insertDetailAssessment(req, dataQuestion, errAssessment => {
          if (errAssessment) console.error(errAssessment)
        })
      }

      assessment.questions = questions
      redisCache.delwild('detail-assessment:*')
      cb(null, assessment)
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
      const data = {
        parentid: req.body.parentId,
        title: req.body.title,
        duration: req.body.duration,
        updated_at: new Date()
      }

      assessmentModel.updateAssessment(req, assessmentId, data, (errAssessment, resultAssessment) => {
        redisCache.delwild(`assessment-list:*`)
        redisCache.del(`assessment-detail${assessmentId}`)
        cb(errAssessment, resultAssessment)
      })
    },
    (assessment, cb) => {
      console.log(assessment)
      const questions = []
      for (let i = 0; i < _.size(req.body.question); i++) {
        let dataQuestion = {}
        if (!_.result(req.body, 'question[' + i + '].detailid', 0)) {
          dataQuestion = {
            assessmentid: assessment.assessmentid,
            question_type: 'single-choice',
            question: req.body.question[i].question,
            answer: req.body.question[i].answer,
            status: 1,
            options: req.body.question[i].options,
            created_at: new Date(),
            updated_at: new Date()
          }

          assessmentModel.insertDetailAssessment(req, dataQuestion, errAssessment => {
            if (errAssessment) console.error(errAssessment)
          })
        } else {
          dataQuestion = {
            assessmentid: assessment.assessmentid,
            question_type: 'single-choice',
            question: req.body.question[i].question,
            answer: req.body.question[i].answer,
            status: 1,
            options: req.body.question[i].options,
            updated_at: new Date()
          }

          assessmentModel.updateDetailAssessment(req, req.body.question[i].detailid, dataQuestion, errAssessment => {
            if (errAssessment) console.error(errAssessment)
          })
        }

        questions.push(dataQuestion)
      }

      assessment.questions = questions
      redisCache.delwild('detail-assessment:*')
      cb(null, assessment)
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

exports.getDetailAssessment = (req, res) => {
  req.checkParams('assessmentId', 'assessmentId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const assessmentId = req.params.assessmentId
  const limit = _.result(req.query, 'limit', 10)
  const offset = _.result(req.query, 'offset', 0)
  const keyword = _.result(req.query, 'keyword')
  const key = `assessment-detail:${limit}:${offset}:${keyword}` + new Date().getTime()

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
      assessmentModel.getDetailAssessment(req, assessmentId, limit, offset, keyword, (errAssessment, resultAssessment) => {
        if (_.isEmpty(resultAssessment)) {
          return MiscHelper.responses(res, {})
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

exports.getSoal = (req, res) => {
  req.checkParams('detailId', 'detailId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const detailId = req.params.detailId
  const key = `detail-assessment:${detailId}`

  async.waterfall([
    (cb) => {
      redisCache.get(key, soal => {
        if (soal) {
          return MiscHelper.responses(res, soal)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      assessmentModel.getDetailAssessmentDetail(req, detailId, (err, result) => {
        if (_.isEmpty(result)) {
          return MiscHelper.errorCustomStatus(res, { message: 'Course ini tidak ada' })
        } else {
          cb(err, result)
        }
      })
    },
    (dataSoal, cb) => {
      redisCache.setex(key, 600, dataSoal)
      console.log('data cached')
      cb(null, dataSoal)
    }
  ], (errSoal, resultSoal) => {
    if (!errSoal) {
      return MiscHelper.responses(res, resultSoal)
    } else {
      return MiscHelper.errorCustomStatus(res, errSoal, 400)
    }
  })
}

exports.insertSoal = (req, res) => {
  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  let datas = []
  async.waterfall([
    (cb) => {
      for (let i = 0; i < req.body.soal.length; i++) {
        let data = {
          assessmentid: req.params.assessmentId,
          question_type: 'single-choice',
          question: req.body.soal[i].question,
          answer: req.body.soal[i].answer,
          status: 1,
          options: req.body.soal[i].options,
          created_at: new Date(),
          updated_at: new Date()
        }
        assessmentModel.insertDetailAssessment(req, data, (errAssessment, resultAssessment) => {
          if (errAssessment) console.error(errAssessment)
          redisCache.delwild('detail-assessment:*')
          datas.push(resultAssessment)
        })
      }
      cb(null, datas)
    }
  ], (errAssessment, resultAssessment) => {
    if (!errAssessment) {
      return MiscHelper.responses(res, resultAssessment)
    } else {
      return MiscHelper.errorCustomStatus(res, errAssessment, 400)
    }
  })
}

exports.updateSoal = (req, res) => {
  req.checkParams('detailId', 'detailId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const detailId = req.params.detailId
  async.waterfall([
    (cb) => {
      assessmentModel.getDetailAssessmentDetail(req, detailId, (errAssessment, resultAssessment) => {
        if (_.isEmpty(resultAssessment) || errAssessment) {
          return MiscHelper.responses(res, {})
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      let data = {
        updated_at: new Date()
      }
      let option = []
      for (let key in req.body) {
        data[key] = req.body[key]
      }

      for (let i = 1; i < 5; i++) {
        let _id = _.result(data, '_id' + i)
        let isAnswer = _.result(data, 'isAnswer' + i)
        let label = _.result(data, 'label' + i)

        if (!_.isEmpty(_id) && !_.isEmpty(isAnswer) && !_.isEmpty(label)) {
          if (isAnswer === 'false') {
            isAnswer = undefined
          }

          let answer = {
            _id: Number(_id),
            isAnswer: Boolean(isAnswer),
            label: label
          }

          option.push(answer)
        }
      }
      data = _.pick(data, ['question', 'answer', 'status', 'question_type', 'updated_at'])
      if (!_.isEmpty(option)) {
        data.options = JSON.stringify(option, null, 4)
      }

      assessmentModel.updateDetailAssessment(req, detailId, data, (err, result) => {
        redisCache.delwild('detail-assessment:*')
        redisCache.del(`detail-assessment:${detailId}`)
        cb(err, result)
      })
    }
  ], (errUpdateAssessment, resultUpdateAssessment) => {
    if (!errUpdateAssessment) {
      return MiscHelper.responses(res, resultUpdateAssessment)
    } else {
      return MiscHelper.errorCustomStatus(res, errUpdateAssessment, 400)
    }
  })
}

exports.deleteSoal = (req, res) => {
  req.checkParams('detailId', 'detailId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const detailId = req.params.detailId

  assessmentModel.deleteDetailAssessment(req, detailId, (err) => {
    if (!err) {
      redisCache.delwild(`assessment-detail:*`)
      return MiscHelper.responses(res, { message: 'data has been deleted' })
    } else {
      return MiscHelper.errorCustomStatus(res, err, 400)
    }
  })
}
