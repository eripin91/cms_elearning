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
  const key = `get-guru`

  async.waterfall([
    (cb) => {
      redisCache.get(key, guru => {
        if (guru) {
          return MiscHelper.responses(res, guru)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      guruModel.get(req, (errGuru, resultGuru) => {
        cb(errGuru, resultGuru)
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
 * POST : '/add
 *
 * @desc Post guru detail
 *
 * @body  {object} req - body for request
 * @body  {objectId} req.body.fullname - Guru fullname
 * @body  {objectId} req.body.profile_picture - Guru picture
 * @body  {objectId} req.body.description - Guru description
 *
 * @return {object} Request object
 */

exports.insertGuru = (req, res) => {
  req.checkBody('fullname', 'fullname is required').notEmpty()
  req.checkBody('profile_picture', 'profile_picture is required').notEmpty()
  req.checkBody('description', 'description is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const fullname = req.body.fullname
  const picture = req.body.profile_picture
  const description = req.body.description

  async.waterfall([
    (cb) => {
      guruModel.checkGuru(req, fullname, (errCheck, resultCheck) => {
        if (_.isEmpty(resultCheck) || errCheck) {
          cb(errCheck)
        } else {
          return MiscHelper.errorCustomStatus(res, { message: 'Already there' })
        }
      })
    },
    (cb) => {
      const data = {
        fullname: fullname,
        profile_picture: picture,
        description: description,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
      const key = `get-guru`

      guruModel.insertGuru(req, data, (errGuru, resultGuru) => {
        redisCache.del(key)
        cb(errGuru, resultGuru)
      })
    }
  ], (errInsert, resultInsert) => {
    if (!errInsert) {
      return MiscHelper.responses(res, resultInsert)
    } else {
      return MiscHelper.errorCustomStatus(res, errInsert, 400)
    }
  })
}

/*
 * PUT : '/update/:guruId
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
          return MiscHelper.errorCustomStatus(res, { message: 'Guru isn\'t Exist' })
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

      guruModel.updateGuru(req, data, req.params.guruId, (err, result) => {
        redisCache.del(`get-guru-${req.params.guruId}`)
        redisCache.del(`get-guru`)
        cb(err, result)
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
      redisCache.del(`get-guru`)
      redisCache.del(`get-guru-${req.params.guruId}`)
      return MiscHelper.responses(res, result)
    } else {
      return MiscHelper.errorCustomStatus(res, err)
    }
  })
}
