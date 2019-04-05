'use strict'

const async = require('async')
const discussionsModel = require('../models/discussions')
const notificationsModel = require('../models/notifications')
const usersModel = require('../models/users')
const redisCache = require('../libs/RedisCache')

/*
 * GET : '/discussions/get/:courseId'
 *
 * @desc Get discussions by course
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.params.courseId - Id course master
 * @param  {objectId} req.params.userId - Id user master
 *
 * @return {object} Request object
 */

exports.getThread = (req, res) => {
  req.checkParams('courseId', 'courseId is required').notEmpty().isInt()
  req.checkParams('userId', 'userId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const key = `get-thread-${req.params.courseId}-${req.params.userId}`
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
      discussionsModel.getThread(req, req.params.courseId, (errThread, resultThread) => {
        cb(errThread, resultThread)
      })
    },
    (dataThread, cb) => {
      async.eachSeries(dataThread, (item, next) => {
        discussionsModel.checkUserLike(req, req.params.userId, item.discussionid, (err, result) => {
          if (err) console.error(err)

          result.map((like) => {
            item.is_like = like.is_like
          })
          next()
        })
      }, err => {
        cb(err, dataThread)
      })
    },
    (dataThread, cb) => {
      async.eachSeries(dataThread, (item, next) => {
        discussionsModel.checkTotalReply(req, item.discussionid, (err, result) => {
          if (err) console.error(err)

          result.map((total) => {
            item.total_replied = total.total_replied
          })
          next()
        })
      }, err => {
        cb(err, dataThread)
      })
    },
    (dataThread, cb) => {
      async.eachSeries(dataThread, (item, next) => {
        discussionsModel.checkTotalLike(req, item.discussionid, (err, result) => {
          if (err) console.error(err)

          result.map((total) => {
            item.total_like = total.total_like
          })
          next()
        })
      }, err => {
        cb(err, dataThread)
      })
    },
    (dataThread, cb) => {
      redisCache.setex(key, 600, dataThread)
      console.log('proccess cached')
      cb(null, dataThread)
    }
  ], (errThreads, resultThreads) => {
    if (!errThreads) {
      return MiscHelper.responses(res, resultThreads)
    } else {
      return MiscHelper.errorCustomStatus(res, errThreads)
    }
  })
}

/*
 * GET : '/discussions/detail/:discussionId/:userId?sortBy={}&orderBy={}
 *
 * @desc Get discussions by course
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.params.discussionId - Id discussion master
 * @param  {objectId} req.params.userId - Id user master
 *
 * @return {object} Request object
 */

exports.getThreadDetail = (req, res) => {
  req.checkParams('discussionId', 'discussionId is required').notEmpty().isInt()
  req.checkParams('userId', 'userId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const key = `get-thread-detail-${req.params.discussionId}-${req.params.userId}-${req.query.sortBy}-${req.query.orderBy}`
  console.log(key)
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
      discussionsModel.getThreadDetail(req, req.params.discussionId, req.params.userId, req.query.sortBy, req.query.orderBy, (errThreadDetail, resultThreadDetail) => {
        cb(errThreadDetail, resultThreadDetail)
      })
    },
    (dataThreadDetail, cb) => {
      redisCache.setex(key, 600, dataThreadDetail)
      console.log('proccess cached')
      cb(null, dataThreadDetail)
    }
  ], (errDetail, resultDetail) => {
    if (!errDetail) {
      return MiscHelper.responses(res, resultDetail)
    } else {
      return MiscHelper.responses(res, errDetail)
    }
  })
}

/*
 * PUT : '/discussions
 *
 * @desc Post thread question
 *
 * @body  {object} req - body for request
 * @body  {objectId} req.body.courseId - Id course master
 * @body  {objectId} req.body.userId - Id user master
 * @body  {objectId} req.body.content - thread content
 *
 * @return {object} Request object
 */

exports.insertThreadTitle = (req, res) => {
  req.checkBody('userId', 'userId is required').notEmpty().isInt()
  req.checkBody('courseId', 'courseId is required').notEmpty().isInt()
  req.checkBody('content', 'title is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const data = {
    userid: req.body.userId,
    courseid: req.body.courseId,
    post_title: '',
    post_content: req.body.content,
    parent: 0,
    status: 1,
    created_at: new Date(),
    updated_at: new Date()
  }

  discussionsModel.insertThreadTitle(req, data, (errInsert, resultInsert) => {
    if (!errInsert) {
      const key = `get-thread-${req.body.courseId}-${req.body.userId}`
      redisCache.del(key)
      console.log(`${key} is deleted`)
      return MiscHelper.responses(res, resultInsert)
    } else {
      return MiscHelper.errorCustomStatus(res, errInsert, 400)
    }
  })
}

/*
 * PUT : '/discussions/reply
 *
 * @desc Post thread reply
 *
 * @body  {object} req - body for request
 * @body  {objectId} req.body.parentId - Id discussion master
 * @body  {objectId} req.body.userId - Id user master
 * @body  {objectId} req.body.content - thread content
 *
 * @return {object} Request object
 */

exports.insertThreadContent = (req, res) => {
  req.checkBody('userId', 'userId is required').notEmpty().isInt()
  req.checkBody('parentId', 'parentId is required').notEmpty().isInt()
  req.checkBody('content', 'content is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const userId = req.body.userId
  const parentId = req.body.parentId
  const content = req.body.content

  async.waterfall([
    (cb) => {
      discussionsModel.checkQuestion(req, parentId, (errCheck, resultCheck) => {
        if (_.isEmpty(resultCheck) || (errCheck)) {
          return MiscHelper.errorCustomStatus(res, { message: 'Question is not found' })
        } else {
          cb(null, resultCheck)
        }
      })
    },
    (dataQuestion, cb) => {
      const data = {
        userid: userId,
        courseid: dataQuestion[0].courseid,
        post_title: '',
        post_content: content,
        parent: parentId,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }

      discussionsModel.insertThreadContent(req, data, (err) => {
        if (err) {
          return MiscHelper.responses(res, err, 400)
        } else {
          usersModel.checkUser(req, userId, (errUser, resultUser) => {
            if (!errUser) {
              dataQuestion[0].name = resultUser[0].fullname
            }
            cb(null, dataQuestion[0])
          })
        }
      })
    },
    (dataThread, cb) => {
      const message = `Pertanyaan anda Telah Dibalas Oleh ${dataThread.name}`

      const data = {
        userid: dataThread.userid,
        message: message,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }

      notificationsModel.insert(req, data, (errInsert, resultInsert) => {
        const key = `get-thread-detail-${parentId}-${userId}-total_like-desc`
        redisCache.del(`get-thread-detail-${parentId}-${userId}-time-desc`)
        redisCache.del(key)
        cb(errInsert, resultInsert)
      })
    }
  ], (errInsertContent, resultInsertContent) => {
    if (!errInsertContent) {
      return MiscHelper.responses(res, resultInsertContent)
    } else {
      return MiscHelper.errorCustomStatus(res, errInsertContent)
    }
  })
}

/*
 * POST : '/discussions/like
 *
 * @desc Post thread like
 *
 * @body  {object} req - body for request
 * @body  {objectId} req.body.discussionId - Id discussion master
 * @body  {objectId} req.body.userId - Id user master
 * @body  {objectId} req.body.status - like status
 *
 * @return {object} Request object
 */

exports.like = (req, res) => {
  req.checkBody('discussionId', 'discussionId is required').notEmpty().isInt()
  req.checkBody('userId', 'userId is required').notEmpty().isInt()
  req.checkBody('status', 'status is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const discussionId = req.body.discussionId
  const userId = req.body.userId
  const status = req.body.status

  async.waterfall([
    (cb) => {
      discussionsModel.checkLike(req, discussionId, userId, (errCheck, resultCheck) => {
        if (_.isEmpty(resultCheck) || (errCheck)) {
          cb(errCheck)
        } else {
          const data = {
            status: status,
            updated_at: new Date()
          }

          discussionsModel.updateLike(req, resultCheck[0].id, data, (err, resultUpdateLike) => {
            if (err) {
              cb(err)
            } else {
              discussionsModel.checkThread(req, discussionId, (errCheck, resultCheck) => {
                if (!errCheck) {
                  const key = `get-thread-${resultCheck[0].courseid}-${userId}`
                  redisCache.del(key)
                  console.log(`${key} deleted`)
                  if (resultCheck[0].parent === 0) {
                    const key = `get-thread-detail-${discussionId}-${userId}-total_like-desc`
                    redisCache.del(`get-thread-detail-${discussionId}-${userId}-time-desc`)
                    redisCache.del(key)
                  } else {
                    const key = `get-thread-detail-${resultCheck[0].parent}-${userId}-total_like-desc`
                    redisCache.del(`get-thread-detail-${resultCheck[0].parent}-${userId}-time-desc`)
                    redisCache.del(key)
                  }
                }
              })
              return MiscHelper.responses(res, resultUpdateLike)
            }
          })
        }
      })
    },
    (cb) => {
      const data = {
        discussionid: discussionId,
        userid: userId,
        status: status,
        created_at: new Date(),
        updated_at: new Date()
      }

      discussionsModel.insertLike(req, data, (err, result) => {
        discussionsModel.checkThread(req, discussionId, (errCheck, resultCheck) => {
          if (!errCheck) {
            const key = `get-thread-${resultCheck[0].courseid}-${userId}`
            redisCache.del(key)
            if (resultCheck[0].parent === 0) {
              const key = `get-thread-detail-${discussionId}-${userId}-total_like-desc`
              redisCache.del(`get-thread-detail-${discussionId}-${userId}-time-desc`)
              redisCache.del(key)
            } else {
              const key = `get-thread-detail-${resultCheck[0].parent}-${userId}-total_like-desc`
              redisCache.del(`get-thread-detail-${resultCheck[0].parent}-${userId}-time-desc`)
              redisCache.del(key)
            }
            cb(err, result)
          }
        })
      })
    }
  ], (errLike, resultLike) => {
    if (!errLike) {
      return MiscHelper.responses(res, resultLike)
    } else {
      return MiscHelper.errorCustomStatus(res, errLike, 400)
    }
  })
}
