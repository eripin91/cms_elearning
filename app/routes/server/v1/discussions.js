/* global DiscussionsControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/get', DiscussionsControllers.get)
  .get('/get/:courseId', DiscussionsControllers.getThreadCourse)
  .get('/get/detail/:discussionId', DiscussionsControllers.getDetail)
  .delete('/delete/:discussionId', DiscussionsControllers.deleteThread)

module.exports = Route
