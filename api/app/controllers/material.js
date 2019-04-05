/* global _ */

'use strict'

const async = require('async')
const materialModel = require('../models/material')
const courseModel = require('../models/courses')
const notificationModel = require('../models/notifications')
const classesModel = require('../models/classes')
const redisCache = require('../libs/RedisCache')

/*
 * GET : '/material/userid
 *
 *  @desc GET Downloaded Course
 *
 * @param {object} req - Parameter for Request
 *
 * @return {object} Request object
*/

exports.get = (req, res) => {
  const key = `get-material-user-:${req.params.userId}`
  async.waterfall([
    (cb) => {
      redisCache.get(key, material => {
        if (material) {
          return MiscHelper.responses(res, material)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      materialModel.getUserMaterial(req, req.params.userId, (errMaterial, resultMaterial) => {
        resultMaterial.map((result) => {
          result.duration = MiscHelper.convertDuration(result.duration)
        })
        cb(errMaterial, resultMaterial)
      })
    },
    (dataMaterials, cb) => {
      redisCache.setex(key, 600, dataMaterials)
      console.log('process cached')
      cb(null, dataMaterials)
    }
  ], (errMaterial, resultMaterial) => {
    if (!errMaterial) {
      return MiscHelper.responses(res, resultMaterial)
    } else {
      return MiscHelper.errorCustomStatus(res, errMaterial, 400)
    }
  })
}

exports.update = (req, res) => {
  const userId = req.params.userId
  const materialId = req.params.materialId
  async.waterfall([
    (cb) => {
      materialModel.checkUserMaterialAlreadyExist(req, userId, materialId, (errCheck, resultCheck) => {
        if (_.isEmpty(resultCheck) || errCheck) {
          cb(errCheck, 1)
        } else {
          const data = {
            updated_at: new Date()
          }
          if (req.body.is_downloaded === undefined) {
            Object.assign(data, { is_done_watching: req.body.is_done_watching })
          } else if (req.body.is_done_watching === undefined) {
            Object.assign(data, { is_downloaded: req.body.is_downloaded })
          }
          materialModel.updateUserMaterial(req, resultCheck[0].id, data, (err, resultUpdateMaterial) => {
            if (err) {
              cb(err)
            } else {
              cb(err, resultCheck)
            }
          })
        }
      })
    },
    (trigger, cb) => {
      if (trigger === 1) {
        const data = {
          userid: userId,
          materialid: materialId,
          watchingduration: 0,
          is_done_watching: 0,
          is_downloaded: 0,
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        }
        if (req.body.is_downloaded === undefined) {
          data.is_done_watching = req.body.is_done_watching
        } else if (req.body.is_done_watching === undefined) {
          data.is_downloaded = req.body.is_downloaded
        }

        materialModel.insertUserMaterial(req, data, (err, result) => {
          const key = `get-material-user-:${req.params.userId}`
          redisCache.del(key)
          const data = {
            userid: req.params.userId,
            materialid: req.params.materialId,
            is_material_complete: req.body.is_done_watching,
            detailid: req.params.detailId
          }
          cb(err, data)
        })
      } else {
        const key = `get-material-user-:${req.params.userId}`
        redisCache.del(key)
        const data = {
          userid: req.params.userId,
          materialid: req.params.materialId,
          is_material_complete: trigger[0].is_done_watching,
          detailid: req.params.detailId
        }
        cb(null, data)
      }
    },
    (data, cb) => {
      courseModel.getCheckCourseComplete(req, req.params.detailId, (errMaterialDetail, resultMaterialDetail) => {
        if (resultMaterialDetail.jumlah_materi === resultMaterialDetail.user_materi) {
          data.is_completed_detail = 1
          let notif = {
            userid: req.params.userId,
            message: 'Selamat anda telah menyelesaikan semua materi ' + resultMaterialDetail.name + ' pada class ' + resultMaterialDetail.class_name,
            status: 1,
            created_at: new Date(),
            updated_at: new Date()
          }
          notificationModel.checkerNotification(req, notif.message, (err, result) => {
            if (err) console.error(err)
            if (result[0] === undefined) {
              notificationModel.insert(req, notif, (errNotification, resultNotification) => {
                console.log(errNotification, resultNotification)
                const key = `get-user-notification-course$:{req.params.userId}`
                redisCache.del(key)
              })
            } else {
              console.log('err')
            }
          })
        } else {
          data.is_completed_detail = 0
        }
        cb(errMaterialDetail, data)
      })
    },
    (dataDetail, cb) => {
      if (dataDetail.is_completed_detail === 1) {
        courseModel.checkUserCourseDetail(req, req.params.userId, req.params.detailId, (errDetail, resultDetail) => {
          if (_.isEmpty(resultDetail) || errDetail) {
            const data = {
              userid: req.params.userId,
              detailId: req.params.detailId,
              is_completed: 1,
              is_done_watching: 1,
              created_at: new Date(),
              updated_at: new Date()
            }
            courseModel.insertDetailMaterial(req, data, (err, result) => {
              const key = `get-user-course-detail-$:{req.params.userId}-$:{req.params.detailId}`
              redisCache.del(key)
              cb(err, dataDetail)
            })
          } else {
            courseModel.checkDetailMaterial(req, req.params.detailId, (err, result) => {
              const key = `get-user-course-detail-$:{req.params.userId}-$:{req.params.detailId}`
              redisCache.del(key)
              cb(err, dataDetail)
            })
          }
        })
      } else {
        cb(null, dataDetail)
      }
    },
    (dataDetail, cb) => {
      courseModel.checkUserClassProgress(req, req.params.classId, req.params.userId, (err, result) => {
        dataDetail.classId = req.params.classId
        if (result.jumlah_total === result.user_progress) {
          dataDetail.class_completed = 1
        } else {
          dataDetail.class_completed = 0
        }
        cb(err, dataDetail)
      })
    },
    (dataDetail, cb) => {
      if (dataDetail.class_completed === 1) {
        courseModel.checkerClassDone(req, req.params.classId, req.params.userId, (err, result) => {
          if (_.isEmpty(result)) {
            console.log('User Tidak Memiliki Class Ini' + err)
          } else {
            let data = {
              is_completed: 1,
              finished_at: new Date(),
              updated_at: new Date()
            }
            classesModel.updateUserClass(req, data, result[0].id, (err, resultUpdate) => {
              let notif = {
                userid: req.params.userId,
                message: 'Selamat anda telah menyelesaikan semua materi pada class ' + result[0].name,
                status: 1,
                created_at: new Date(),
                updated_at: new Date()
              }
              console.log(err, resultUpdate)
              notificationModel.checkerNotification(req, notif.message, (err, result) => {
                if (result[0] === undefined) {
                  notificationModel.insert(req, notif, (errNotification, resultNotification) => {
                    const key = `get-user-notification-classes-$:{req.params.userId}`
                    console.log(errNotification, resultNotification, err)
                    redisCache.del(key)
                  })
                }
              })
            })
          }
        })
      }
      cb(null, dataDetail)
    }

  ],
  (errMaterial, resultMaterial) => {
    if (!errMaterial) {
      return MiscHelper.responses(res, resultMaterial)
    } else {
      return MiscHelper.errorCustomStatus(res, errMaterial, 400)
    }
  })
}

exports.updateUserDownloadMaterial = (req, res) => {
  async.waterfall([
    (cb) => {
      courseModel.checkUserMaterial(req, req.params.materialId, (errMateri, resultMateri) => {
        if (_.isEmpty(resultMateri) || errMateri) {
          cb(errMateri, 1)
        } else {
          const data = {
            is_downloaded: req.body.is_downloaded,
            updated_at: new Date()
          }
          courseModel.updateUserMaterial(req, resultMateri[0].id, data, (err, result) => {
            let notif = {
              userid: req.params.userId,
              message: 'Materi ' + resultMateri[0].material_name + ' telah berhasil di download',
              status: 1,
              created_at: new Date(),
              updated_at: new Date()
            }
            if (err) {
              cb(err)
            } else {
              notificationModel.insert(req, notif, (errNotification, resultNotification) => {
                const key = `get-user-notification-materials-$:{req.params.userId}`
                console.log(errNotification, resultNotification)
                redisCache.del(key)
              })
              cb(err, result)
            }
          })
        }
      })
    },
    (dataMateri, cb) => {
      if (dataMateri === 1) {
        const data = {
          userid: req.params.userId,
          materialid: req.params.materialId,
          watchingduration: 0,
          is_done_watching: 0,
          is_downloaded: 1,
          status: 1,
          created_at: new Date(),
          updated_at: new Date()
        }
        courseModel.insertUserMaterial(req, data, (err, result) => {
          let notif = {
            userid: req.params.userId,
            message: 'Materi ' + result[0].material_name + ' telah berhasil di download',
            status: 1,
            created_at: new Date(),
            updated_at: new Date()
          }
          notificationModel.insert(req, notif, (errNotification, resultNotification) => {
            const key = `get-user-notification-materials-$:{req.params.userId}`
            console.log(errNotification, resultNotification)
            redisCache.del(key)
          })
          const key = `get-material-user-$:{req.params.userId}`
          redisCache.del(key)
          cb(err, result)
        })
      } else {
        cb(null, dataMateri)
      }
    }
  ], (errMaterial, resultMaterial) => {
    if (!errMaterial) {
      return MiscHelper.responses(res, resultMaterial)
    } else {
      return MiscHelper.errorCustomStatus(res, errMaterial, 400)
    }
  })
}
