'use strict'

const async = require('async')
const classesModel = require('../models/classes')
const notificationsModel = require('../models/notifications')
const redisCache = require('../libs/RedisCache')

/*
 * GET : '/classes/get'
 *
 * @desc Get class by time
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */

exports.get = (req, res) => {
  const key = 'get-class'
  async.waterfall([
    (cb) => {
      redisCache.get(key, classes => {
        if (classes) {
          return MiscHelper.responses(res, classes)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      classesModel.get(req, (errClasses, resultClasses) => {
        cb(errClasses, resultClasses)
      })
    },
    (dataClasses, cb) => {
      async.eachSeries(dataClasses, (item, next) => {
        classesModel.checkTotalCourse(req, item.classid, (err, result) => {
          if (err) console.error(err)

          result.map((course) => {
            console.log(dataClasses.indexOf(item))
            item.courses = course.courses
          })
          next()
        })
      }, err => {
        cb(err, dataClasses)
      })
    },
    (dataClasses, cb) => {
      async.eachSeries(dataClasses, (item, next) => {
        classesModel.checkTotalDuration(req, item.classid, (err, result) => {
          if (err) console.error(err)

          result.map((course) => {
            var minutes = Math.floor(course.durasi / 60)
            var second = course.durasi - (minutes * 60)
            item.durasi = `${minutes}:${second}`
          })
          next()
        })
      }, err => {
        cb(err, dataClasses)
      })
    },
    (dataClasses, cb) => {
      redisCache.setex(key, 600, dataClasses)
      console.log('process cached')
      cb(null, dataClasses)
    }
  ], (errClasses, resultClasses) => {
    if (!errClasses) {
      return MiscHelper.responses(res, resultClasses)
    } else {
      return MiscHelper.errorCustomStatus(res, errClasses)
    }
  })
}

/*
 * GET : '/classes/get/:classId/:userId'
 *
 * @desc Get detail class by user
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.params.classId - Id class master
 * @param  {objectId} req.params.userId - Id user master
 *
 * @return {object} Request object
 */

exports.getDetail = (req, res) => {
  req.checkParams('classId', 'classId is required').notEmpty().isInt()
  req.checkParams('userId', 'userId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const key = `get-class-detail-${req.params.classId}-${req.params.userId}`

  async.waterfall([
    (cb) => {
      redisCache.get(key, detail => {
        if (detail) {
          return MiscHelper.responses(res, detail)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      classesModel.getDetail(req, req.params.classId, req.params.userId, (errDetail, resultDetail) => {
        if (_.isEmpty(resultDetail)) {
          classesModel.getDetailClass(req, req.params.classId, (errData, resultData) => {
            resultData[0].is_join = 0
            cb(errData, resultData[0])
          })
        } else {
          classesModel.checkCourseDone(req, req.params.userId, req.params.classId, (err, result) => {
            if (!err) {
              resultDetail[0].is_join = 1
              resultDetail[0].course_done = result[0].course_done
              cb(errDetail, resultDetail[0])
            }
          })
        }
      })
    },
    (dataDetail, cb) => {
      classesModel.checkTotalCourse(req, req.params.classId, (err, result) => {
        dataDetail.course = result[0].courses
        cb(err, dataDetail)
      })
    },
    (dataDetail, cb) => {
      classesModel.checkTotalMember(req, req.params.classId, (err, result) => {
        dataDetail.member = result[0].member
        cb(err, dataDetail)
      })
    },
    (dataDetail, cb) => {
      classesModel.checkUserRating(req, req.params.classId, req.params.userId, (err, result) => {
        dataDetail.is_rating = result[0].is_rating
        cb(err, dataDetail)
      })
    },
    (dataDetail, cb) => {
      redisCache.setex(key, 600, dataDetail)
      console.log(`prosess cached ${key}`)
      cb(null, dataDetail)
    }
  ], (errDetails, resultDetails) => {
    if (!errDetails) {
      return MiscHelper.responses(res, resultDetails)
    } else {
      return MiscHelper.errorCustomStatus(res, errDetails)
    }
  })
}

/*
 * GET : '/classes/recs'
 *
 * @desc Get class recommendation
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 *
 */

exports.getRec = (req, res) => {
  const key = `get-recommendation-${req.params.userId}`
  async.waterfall([
    (cb) => {
      redisCache.get(key, recommendation => {
        if (recommendation) {
          return MiscHelper.responses(res, recommendation)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      classesModel.getRec(req, (errRec, resultRec) => {
        cb(errRec, resultRec)
      })
    },
    (dataRec, cb) => {
      async.eachSeries(dataRec, (item, next) => {
        classesModel.checkTotalCourse(req, item.classid, (err, result) => {
          if (err) console.error(err)

          result.map((course) => {
            item.courses = course.courses
          })
          next()
        })
      }, err => {
        cb(err, dataRec)
      })
    },
    (dataRec, cb) => {
      async.eachSeries(dataRec, (item, next) => {
        classesModel.checkTotalDuration(req, item.classid, (err, result) => {
          if (err) console.error(err)

          result.map((course) => {
            var minutes = Math.floor(course.durasi / 60)
            var second = course.durasi - (minutes * 60)
            item.durasi = `${minutes}:${second}`
          })
          next()
        })
      }, err => {
        cb(err, dataRec)
      })
    },
    (dataRec, cb) => {
      classesModel.checkUserClass(req, req.params.userId, (err, result) => {
        if (err) console.error(err)

        async.eachSeries(result, (item, next) => {
          dataRec.map((course, index) => {
            if (item.classid === course.classid) {
              dataRec.splice(index, 1)
            }
          })
          next()
        }, err => {
          cb(err, dataRec)
        })
      })
    },
    (dataRec, cb) => {
      redisCache.setex(key, 600, dataRec)
      console.log('process cached')
      cb(null, dataRec)
    }
  ], (errRecs, resultRecs) => {
    if (!errRecs) {
      return MiscHelper.responses(res, resultRecs)
    } else {
      return MiscHelper.errorCustomStatus(res, errRecs)
    }
  })
}

/*
 * GET : '/classes/user/:userId'
 *
 * @desc Get class list of user
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.params.userId - Id user master
 *
 * @return {object} Request object
 */

exports.getUserClass = (req, res) => {
  req.checkParams('userId', 'userId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const key = `get-user-class-${req.params.userId}`

  async.waterfall([
    (cb) => {
      redisCache.get(key, userClass => {
        if (userClass) {
          return MiscHelper.responses(res, userClass)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      classesModel.getUserClass(req, req.params.userId, (errUserClass, resultUserClass) => {
        if (_.isEmpty(resultUserClass)) {
          return MiscHelper.responses(res, { 'message': 'Belum ada kelas yang diikuti, ayo segera gabung kelas !' })
        } else {
          cb(errUserClass, resultUserClass)
        }
      })
    },
    (dataUserClass, cb) => {
      async.eachSeries(dataUserClass, (item, next) => {
        classesModel.checkTotalCourse(req, item.classid, (err, result) => {
          if (err) console.error(err)

          result.map((course) => {
            item.courses = course.courses
          })
          next()
        })
      }, err => {
        cb(err, dataUserClass)
      })
    },
    (dataUserClass, cb) => {
      async.eachSeries(dataUserClass, (item, next) => {
        classesModel.checkTotalMember(req, item.classid, (err, result) => {
          if (err) console.error(err)

          result.map((course) => {
            item.member = course.member
          })
          next()
        })
      }, err => {
        cb(err, dataUserClass)
      })
    },
    (dataUserClass, cb) => {
      async.eachSeries(dataUserClass, (item, next) => {
        classesModel.checkCourseDone(req, req.params.userId, item.classid, (err, result) => {
          if (err) console.error(err)

          result.map((course) => {
            item.course_done = course.course_done
          })
          next()
        })
      }, err => {
        cb(err, dataUserClass)
      })
    },
    (dataUserClass, cb) => {
      redisCache.setex(key, 600, dataUserClass)
      console.log('proccess cached')
      cb(null, dataUserClass)
    }
  ], (errUserClasses, resultUserClasses) => {
    if (!errUserClasses) {
      return MiscHelper.responses(res, resultUserClasses)
    } else {
      return MiscHelper.errorCustomStatus(res, errUserClasses)
    }
  })
}

/*
 * POST : '/classes/rating'
 *
 * @desc Post class rating
 *
 * @body  {object} req - body for request
 * @body  {objectId} req.body.userId - Id user master
 * @body  {objectId} req.body.classId - Id class master
 * @body  {objectId} req.body.rating - rating value
 *
 * @return {object} Request object
 */

exports.rating = (req, res) => {
  req.checkBody('userId', 'userId is required').notEmpty().isInt()
  req.checkBody('classId', 'classId is requires').notEmpty().isInt()
  req.checkBody('rating', 'rating is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const userId = req.body.userId
  const classId = req.body.classId
  const rating = req.body.rating

  async.waterfall([
    (cb) => {
      const data = {
        userid: userId,
        classid: classId,
        rating: rating,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }

      classesModel.inserRating(req, data, (err) => {
        if (!err) {
          cb(null)
        } else {
          return MiscHelper.errorCustomStatus(res, err, 400)
        }
      })
    },
    (cb) => {
      classesModel.getAverageRating(req, classId, (err, avg) => {
        cb(err, avg)
      })
    },
    (ratingAvg, cb) => {
      const data = {
        rating: ratingAvg[0].rating
      }
      console.log(data)
      classesModel.updateRating(req, classId, data, (errUpdate, resultUpdate) => {
        const key = `get-class-detail-${classId}-${userId}`
        redisCache.del(key)
        cb(errUpdate, resultUpdate)
      })
    }
  ], (errRating, resultRating) => {
    if (!errRating) {
      return MiscHelper.responses(res, resultRating)
    } else {
      return MiscHelper.errorCustomStatus(res, errRating, 400)
    }
  })
}

/*
 * POST : '/classes/add'
 *
 * @desc Join to class
 *
 * @body  {object} req - body for request
 * @body  {objectId} req.body.userId - Id user master
 * @body  {objectId} req.body.classId - Id class master
 *
 * @return {object} Request object
 */

exports.insertUserClass = (req, res) => {
  req.checkBody('userId', 'userId is required').notEmpty().isInt()
  req.checkBody('classId', 'classId is requires').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const userId = req.body.userId
  const classId = req.body.classId

  async.waterfall([
    (cb) => {
      const data = {
        userid: userId,
        classid: classId,
        score: 0,
        finished_at: new Date(),
        is_completed: 0,
        certificate: '',
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }

      classesModel.insertUserClass(req, data, (err) => {
        if (err) {
          return MiscHelper.errorCustomStatus(res, err, 400)
        } else {
          const key = `get-class-detail-${classId}-${userId}`
          redisCache.del(key)
          cb(null)
        }
      })
    },
    (cb) => {
      classesModel.checkDetailClass(req, classId, (errDetail, resultDetail) => {
        cb(errDetail, resultDetail)
      })
    },
    (dataDetail, cb) => {
      const message = `Selamat Anda Telah Bergabung di Kelas ${dataDetail[0].name}`
      const data = {
        userid: userId,
        message: message,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }

      notificationsModel.insert(req, data, (errInsert, resultInsert) => {
        redisCache.del(`get-user-class-${userId}`)
        redisCache.del(`get-recommendation-${userId}`)
        redisCache.del(`get-dashboard:${userId}`)
        cb(errInsert, resultInsert)
      })
    }
  ], (errInsertClass, resultInserClass) => {
    if (!errInsertClass) {
      return MiscHelper.responses(res, resultInserClass)
    } else {
      return MiscHelper.errorCustomStatus(res, errInsertClass)
    }
  })
}
