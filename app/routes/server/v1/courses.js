/* global CoursesControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/chapter/:classId', CoursesControllers.getDetail)
  .post('/chapter/:classId', CoursesControllers.insertDetail)
  .patch('/chapter/:classId/:detailId', CoursesControllers.updateDetail)

module.exports = Route
