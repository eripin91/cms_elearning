/* global NotificationsControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/get/:userId', AuthHelper.requiresAccessToken, NotificationsControllers.get)

module.exports = Route
