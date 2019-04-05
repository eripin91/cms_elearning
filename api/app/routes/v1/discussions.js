/* global DiscussionsControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/get/:courseId/:userId', AuthHelper.requiresAccessToken, DiscussionsControllers.getThread)
  .get('/detail/:discussionId/:userId', AuthHelper.requiresAccessToken, DiscussionsControllers.getThreadDetail)
  .put('/', AuthHelper.requiresAccessToken, DiscussionsControllers.insertThreadTitle)
  .put('/reply', AuthHelper.requiresAccessToken, DiscussionsControllers.insertThreadContent)
  .post('/like', AuthHelper.requiresAccessToken, DiscussionsControllers.like)

module.exports = Route
