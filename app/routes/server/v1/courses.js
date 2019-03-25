/* global CoursesControllers UploadControllers AuthHelper */

'use strict'

var Route = express.Router()

// Route.all('/*')
Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/list', CoursesControllers.getAllCourses)
  .get('/', CoursesControllers.getCourse)
  .get('/:courseId', CoursesControllers.getCourseDetail)
  .post('/', CoursesControllers.insertCourse)
  .patch('/:courseId', CoursesControllers.updateCourse)
  .delete('/:courseId', CoursesControllers.deleteCourse)

  .get('/chapter/:courseId', CoursesControllers.getDetail)
  .get('/chapter/detail/:detailId', CoursesControllers.getDetails)
  .post('/chapter/:courseId', CoursesControllers.insertDetail)
  .patch('/chapter/:courseId/:detailId', CoursesControllers.updateDetail)
  .delete('/chapter/:courseId/:detailId', CoursesControllers.deleteDetail)

  .get('/chapter/:detailId/material', CoursesControllers.getMaterialList)
  .get('/chapter/:detailId/material/:materialId', CoursesControllers.getMaterialDetail)
  .post('/chapter/:detailId/material', UploadControllers.uploadAws, CoursesControllers.insertMaterialDetail)
  .patch('/chapter/:detailId/material/:materialId', UploadControllers.uploadAws, CoursesControllers.updateMaterial)
  .delete('/chapter/:detailId/material/:materialId', CoursesControllers.deleteMaterial)
module.exports = Route
