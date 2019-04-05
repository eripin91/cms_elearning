/* global */

'use strict'

const async = require('async')
const materialsModel = require('../models/materi')
const redisCache = require('../libs/RedisCache')

exports.get = (req, res) => {
  const key = 'get-material-' + req.query.userid + req.query.classid + req.query.detailid
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
      materialsModel.get(req, [req.query.userid, req.query.classid, req.query.courseid, req.query.detailid, req.query.materialid], (errMaterials, resultMaterials) => {
        console.log(resultMaterials)
        cb(errMaterials, resultMaterials)
      })
    },
    (dataMaterial, cb) => {
      redisCache.setex(key, 0, dataMaterial)
      console.log('processed cached')
      cb(null, dataMaterial)
    }
  ],
  (errMaterials, resultMaterials) => {
    if (!errMaterials) {
      return MiscHelper.responses(res, resultMaterials)
    } else {
      return MiscHelper.errorCustomStatus(res, errMaterials, 400)
    }
  })
}

exports.update = (req, res) => {
  console.log(req.body.is_downloaded)
  console.log(req.body.is_done_watching)

  let dataMaterial = {}
  if (req.body.is_downloaded === undefined) {
    Object.assign(dataMaterial, { is_done_watching: req.body.is_done_watching })
    console.log('sabar')
  } else if (req.body.is_done_watching === undefined) {
    Object.assign(dataMaterial, { is_downloaded: req.body.is_downloaded })
  }
  console.log(dataMaterial)

  materialsModel.update(req, req.params.idMaterial, dataMaterial, (errMaterialUpdated, resultMaterialUpdated) => {
    if (!errMaterialUpdated) {
      return MiscHelper.responses(res, resultMaterialUpdated)
    } else {
      return MiscHelper.errorCustomStatus(res, errMaterialUpdated, 400)
    }
  })
}
