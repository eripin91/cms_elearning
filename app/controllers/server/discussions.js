'use strict'

const async = require('async')
const discussionsModel = require('../../models/discussions')
const redisCache = require('../../libs/RedisCache')

exports.get = (req, res) => {
  const limit = _.result(req.query, 'limit', 10)
  const offset = _.result(req.query, 'offset', 0)
  const keyword = _.result(req.query, 'keyword', '')
  const discussionId = parseInt(_.result(req.query, 'discussionId', 0))

  const key = `get-thread-list-${limit}-${offset}-${keyword}-${discussionId}` + new Date().getTime()

  async.waterfall([
    (cb) => {
      redisCache.get(key, thread => {
        if (_.result(thread, 'data')) {
          return MiscHelper.responses(res, thread.data, 200, { total: thread.total })
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      discussionsModel.get(req, limit, offset, keyword, discussionId, (errThread, resultThread) => {
        cb(errThread, resultThread)
      })
    },
    (dataThread, cb) => {
      async.eachSeries(dataThread, (item, next) => {
        discussionsModel.checkTotalReply(req, item.discussionid, (err, result) => {
          if (err) console.error(err)

          item.total_replied = result[0].total_replied
          next()
        })
      }, err => {
        cb(err, dataThread)
      })
    },
    (thread, cb) => {
      discussionsModel.getTotalThread(req, keyword, (errThread, total) => {
        const dataResult = {
          data: thread,
          total: total[0].total
        }
        cb(errThread, dataResult)
      })
    },
    (dataThread, cb) => {
      redisCache.setex(key, 600, dataThread)
      console.log('proccess cached')
      cb(null, dataThread)
    }
  ], (errThreads, resultThreads) => {
    if (!errThreads) {
      return MiscHelper.responses(res, resultThreads.data, 200, { total: resultThreads.total })
    } else {
      return MiscHelper.errorCustomStatus(res, errThreads, 400)
    }
  })
}

exports.getThreadCourse = (req, res) => {
  req.checkParams('courseId', 'courseId is requires').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const limit = _.result(req.query, 'limit', 10)
  const offset = _.result(req.query, 'offset', 0)
  const keyword = _.result(req.query, 'keyword', '')

  const key = `get-thread-list-${req.params.courseId}`

  async.waterfall([
    (cb) => {
      redisCache.get(key, thread => {
        if (_.result(thread, 'data')) {
          return MiscHelper.responses(res, thread.data, 200, { total: thread.total })
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      discussionsModel.getThreadCourse(req, req.params.courseId, limit, offset, keyword, (errThread, resultThread) => {
        cb(errThread, resultThread)
      })
    },
    (dataThread, cb) => {
      async.eachSeries(dataThread, (item, next) => {
        discussionsModel.checkTotalReply(req, item.discussionid, (err, result) => {
          if (err) console.error(err)

          item.total_replied = result[0].total_replied
          next()
        })
      }, err => {
        cb(err, dataThread)
      })
    },
    (thread, cb) => {
      discussionsModel.getTotalThreadCourse(req, req.params.courseId, keyword, (errThread, total) => {
        const dataResult = {
          data: thread,
          total: total[0].total
        }
        cb(errThread, dataResult)
      })
    },
    (dataThread, cb) => {
      redisCache.setex(key, 600, dataThread)
      console.log('proccess cached')
      cb(null, dataThread)
    }
  ], (errThreads, resultThreads) => {
    if (!errThreads) {
      return MiscHelper.responses(res, resultThreads.data, 200, { total: resultThreads.total })
    } else {
      return MiscHelper.errorCustomStatus(res, errThreads)
    }
  })
}

exports.getDiscussion = (req, res) => {
  req.checkParams('discussionId', 'discussionId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const key = `get-thread-detail-${req.params.discussionId}` + new Date().getTime()

  async.waterfall([
    (cb) => {
      redisCache.get(key, thread => {
        if (thread) {
          return MiscHelper.responses(res, thread)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      discussionsModel.getDiscussionOnly(req, req.params.discussionId, (errThread, resultThread) => {
        redisCache.setex(key, 600, resultThread)
        cb(errThread, resultThread[0])
      })
    }
  ], (errThreads, resultThreads) => {
    if (!errThreads) {
      return MiscHelper.responses(res, resultThreads)
    } else {
      return MiscHelper.errorCustomStatus(res, errThreads)
    }
  })
}

exports.getDetail = (req, res) => {
  req.checkParams('discussionId', 'discussionId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const key = `get-thread-detail-with-reply-${req.params.discussionId}` + new Date().getTime()

  async.waterfall([
    (cb) => {
      redisCache.get(key, thread => {
        if (thread) {
          return MiscHelper.responses(res, thread)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      discussionsModel.getQuestion(req, req.params.discussionId, (errThread, resultThread) => {
        console.log(resultThread)
        console.log(errThread)
        cb(errThread, resultThread[0])
      })
    },
    (dataThread, cb) => {
      if (!_.isEmpty(dataThread)) {
        discussionsModel.getReply(req, req.params.discussionId, (err, result) => {
          dataThread.reply = result
          cb(err, dataThread)
        })
      } else {
        return MiscHelper.errorCustomStatus(res, { message: 'No Thread available' })
      }
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

exports.deleteThread = (req, res) => {
  req.checkParams('discussionId', 'discussionId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      discussionsModel.checkTread(req, req.params.discussionId, (err, result) => {
        if (_.isEmpty(result) || err) {
          return MiscHelper.errorCustomStatus(res, { message: 'No Thread to be deleted' })
        } else {
          cb(null, result)
        }
      })
    },
    (dataThread, cb) => {
      discussionsModel.deleteThread(req, req.params.discussionId, (errDelete, resultDelete) => {
        if (!errDelete) {
          if (dataThread.parent !== 0) {
            redisCache.delwild(`get-thread-*`)
            // redisCache.del(`get-thread-list-${dataThread.courseid}`)
            // redisCache.del(`get-thread-detail-${dataThread.parent}`)
            return MiscHelper.responses(res, resultDelete)
          } else {
            redisCache.delwild(`get-thread-*`)
            // redisCache.del(`get-thread-list-${dataThread.courseid}`)
            // redisCache.del(`get-thread-detail-${req.params.discussionId}`)
            cb(null)
          }
        } else {
          return MiscHelper.errorCustomStatus(res, errDelete)
        }
      })
    },
    (cb) => {
      discussionsModel.deleteAnswer(req, req.params.discussionId, (errDelete, resultDelete) => {
        cb(errDelete, resultDelete)
      })
    }
  ], (errDel, resultDel) => {
    if (!errDel) {
      return MiscHelper.responses(res, resultDel)
    } else {
      return MiscHelper.errorCustomStatus(res, errDel)
    }
  })
}

/*
 * POST : '/discussion/update/:discussionId'
 *
 * @desc Update discussion
 *
 * @param  {object} req - Parameters for request
 * @param  {integer} req.params.discussionId - discussionId for admin
 *
 * @return {object} Request object
 */

exports.update = (req, res) => {
  req.checkParams('discussionId', 'discussionId is required').notEmpty()
  req.checkBody('post_content', 'content is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const dataUpdate = {
    post_content: req.body.post_content
  }

  discussionsModel.update(req, req.params.discussionId, dataUpdate, (errDiscussion, resultDiscussion) => {
    console.log(errDiscussion)
    if (!errDiscussion) {
      redisCache.delwild('get-thread:*')
      return MiscHelper.responses(res, resultDiscussion)
    } else {
      return MiscHelper.errorCustomStatus(res, errDiscussion, 400)
    }
  })
}
