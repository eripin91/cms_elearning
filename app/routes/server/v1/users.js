/* global UsersControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/get', UsersControllers.get)
  .get('/get/:userId', UsersControllers.getDetail)
  .post('/update/:userId', UsersControllers.update)
  .get('/delete/:userId', UsersControllers.delete)

module.exports = Route
