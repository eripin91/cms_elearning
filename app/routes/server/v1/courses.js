/* global CoursesControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/:classId', CoursesControllers.getCourse)
  .get('/:classId/:courseId', CoursesControllers.getCourseDetail)
  .post('/:classId', CoursesControllers.insertCourse)
  .patch('/:classId/:courseId', CoursesControllers.updateCourse)
  .delete('/:classId/:courseId', CoursesControllers.deleteDetail)
  .get('/chapter/:classId', CoursesControllers.getDetail)
  .post('/chapter/:classId', CoursesControllers.insertDetail)
  .patch('/chapter/:classId/:detailId', CoursesControllers.updateDetail)
  .delete('/chapter/:classId/:detailId', CoursesControllers.deleteDetail)
  .get('/chapter/:detailId/material', CoursesControllers.getMaterialList)
  .get('/chapter/:detailId/material/:materialId', CoursesControllers.getMaterialDetail)
  .post('/chapter/:detailId/material', CoursesControllers.insertMaterialDetail)
  .patch('/chapter/:detailId/material/:materialId', CoursesControllers.updateMaterial)
  .delete('/chapter/:detailId/material/:materialId', CoursesControllers.deleteMaterial)
module.exports = Route
