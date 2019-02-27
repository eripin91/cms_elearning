/* global CoursesControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*'. AuthHelper.requireAuthorization)
  .get('/courses/chapter/:classId', CoursesController.getDetail)
  .post('/courses/chapter/:classId', CoursesController.insertDetail)
  .patch('/courses/chapter/:classId/:detailId', CoursesController.updateDetail)

  module.exports = Route