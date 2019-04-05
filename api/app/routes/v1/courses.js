/* global CoursesControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .get('/:idUser/:idClass/', AuthHelper.requiresAuthorization, AuthHelper.requiresAccessToken, CoursesControllers.get)
  .get('/course/:idCourse/', AuthHelper.requiresAuthorization, AuthHelper.requiresAccessToken, CoursesControllers.detail)
  .get('/get/:idUser/:idDetail', AuthHelper.requiresAuthorization, AuthHelper.requiresAccessToken, CoursesControllers.material)
  .get('/get/detail/material/:userId/:materialDetailId', AuthHelper.requiresAuthorization, AuthHelper.requiresAccessToken, CoursesControllers.materialDetail)
  .get('/detail/:idDetail/material/:materialDetailId', CoursesControllers.nextMaterial)
  .get('/detailcomplete/:userId/:detailId', AuthHelper.requiresAuthorization, AuthHelper.requiresAccessToken, CoursesControllers.getUserCourseDetail)
  .post('/courseMaterial/:userId/:detailId/:materialId', AuthHelper.requiresAuthorization, AuthHelper.requiresAccessToken, CoursesControllers.updateUserCourseMaterial)
  .patch('/detailcomplete/:userId/:detailId', AuthHelper.requiresAuthorization, AuthHelper.requiresAccessToken, CoursesControllers.updateUserCourseDetail)

module.exports = Route
