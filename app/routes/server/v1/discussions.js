/* global DiscussionsControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/get', DiscussionsControllers.get)
  .get('/get/:courseId', DiscussionsControllers.getThreadCourse)
  .get('/get/discussion/:discussionId', DiscussionsControllers.getDiscussion)
  .get('/get/detail/:discussionId', DiscussionsControllers.getDetail)
  .get('/delete/:discussionId', DiscussionsControllers.deleteThread)
  .post('/update/:discussionId', DiscussionsControllers.update)

module.exports = Route
