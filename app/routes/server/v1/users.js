/* global UsersControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/get', UsersControllers.get)
  .get('/delete/:userId', UsersControllers.delete)

module.exports = Route
