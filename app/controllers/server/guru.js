/* global _ redisCache */

'use strict'

const async = require('async')
const guruModel = require('../../models/guru')

/*
 * GET : '/guru/get'
 *
 * @desc Get all guru
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */

exports.get = (req, res) => {
  const limit = _.result(req.query, 'limit', 10)
  const offset = _.result(req.query, 'offset', 0)
  const keyword = _.result(req.query, 'keyword', '')

  const key = `get-guru-list-${limit}-${offset}-${keyword}`

  async.waterfall([
    (cb) => {
      redisCache.get(key, guru => {
        if (_.result(guru, 'data')) {
          return MiscHelper.responses(res, guru.data, 200, { total: guru.total })
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      guruModel.get(req, limit, offset, keyword, (errGuru, resultGuru) => {
        cb(errGuru, resultGuru)
      })
    },
    (dataGuru, cb) => {
      guruModel.getTotalGuru(req, keyword, (errGuru, total) => {
        const resultGuru = {
          data: dataGuru,
          total: total[0].total
        }
        cb(errGuru, resultGuru)
      })
    },
    (dataGuru, cb) => {
      redisCache.setex(key, 100, dataGuru)
      cb(null, dataGuru)
    }
  ], (errGuru, resultGuru) => {
    if (!errGuru) {
      return MiscHelper.responses(res, resultGuru.data, 200, { total: resultGuru.total })
    } else {
      return MiscHelper.errorCustomStatus(res, errGuru, 400)
    }
  })
}

/*
 * GET : '/guru/get/:guruId'
 *
 * @desc Get guru
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.params.guruId - Id guru master
 *
 * @return {object} Request object
 */

exports.getDetail = (req, res) => {
  req.checkParams('guruId', 'guruId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const key = `get-guru-${req.params.guruId}`

  async.waterfall([
    (cb) => {
      redisCache.get(key, guruDetail => {
        if (guruDetail) {
          return MiscHelper.responses(res, guruDetail)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      guruModel.checkDetailGuru(req, req.params.guruId, (errGuru, resultGuru) => {
        cb(errGuru, resultGuru[0])
      })
    },
    (dataGuru, cb) => {
      redisCache.setex(key, 100, dataGuru)
      cb(null, dataGuru)
    }
  ], (errGuru, resultGuru) => {
    if (!errGuru) {
      return MiscHelper.responses(res, resultGuru)
    } else {
      return MiscHelper.errorCustomStatus(res, errGuru)
    }
  })
}

/*
 * DEL : '/delete/:guruId'
 *
 * @desc Delete guru
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.params.guruId - Id guru master
 *
 * @return {object} Request object
 */

exports.deleteGuru = (req, res) => {
  req.checkParams('guruId', 'guruId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  guruModel.deleteGuru(req, req.params.guruId, (err, result) => {
    if (!err) {
      redisCache.delwild(`get-guru-*`)
      return MiscHelper.responses(res, result)
    } else {
      return MiscHelper.errorCustomStatus(res, err)
    }
  })
}

/*
 * POST : '/add
 *
 * @desc Post guru detail
 *
 * @body  {object} req - body for request
 * @body  {objectId} req.body.fullname - Guru fullname
 * @body  {objectId} req.body.file - Guru picture
 * @body  {objectId} req.body.description - Guru description
 *
 * @return {object} Request object
 */

exports.insertGuru = (req, res) => {
  req.checkBody('fullname', 'fullname is required').notEmpty()
  req.checkBody('description', 'description is required').notEmpty()
  req.checkBody('profile_picture', 'profile_picture is required').notEmpty()
  req.checkBody('medium', 'medium is required').notEmpty()
  req.checkBody('thumbnail', 'thumbnail is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      const data = {
        fullname: req.body.fullname,
        profile_picture: req.body.profile_picture,
        medium: req.body.medium,
        thumbnail: req.body.thumbnail,
        description: req.body.description,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }

      guruModel.insertGuru(req, data, (errInsert, resultInsert) => {
        redisCache.delwild(`get-guru-*`)
        cb(errInsert, resultInsert)
      })
    }
  ], (errInsert, resultInsert) => {
    if (!errInsert) {
      return MiscHelper.responses(res, resultInsert)
    } else {
      return MiscHelper.errorCustomStatus(res, errInsert)
    }
  })
}

/*
 * PATCH : '/update/:guruId
 *
 * @desc Update guru detail
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.params.guruId - Id guru master
 *
 * @body  {object} req - body for request
 * @body  {objectId} req.body.fullname - Guru fullname
 * @body  {objectId} req.body.profile_picture - Guru picture
 * @body  {objectId} req.body.description - Guru description
 *
 * @return {object} Request object
 */

exports.updateGuru = (req, res) => {
  req.checkParams('guruId', 'guruId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      guruModel.checkDetailGuru(req, req.params.guruId, (errCheck, resultCheck) => {
        if (_.isEmpty(resultCheck) || errCheck) {
          return MiscHelper.errorCustomStatus(res, { message: 'Class isn\'t Exist' })
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

      guruModel.updateGuru(req, data, req.params.guruId, (errUpdate, resultUpdate) => {
        redisCache.delwild(`get-guru-*`)
        cb(errUpdate, resultUpdate)
      })
    }
  ], (errUpdate, resultUpdate) => {
    if (!errUpdate) {
      return MiscHelper.responses(res, resultUpdate)
    } else {
      return MiscHelper.errorCustomStatus(res, errUpdate)
    }
  })
}
