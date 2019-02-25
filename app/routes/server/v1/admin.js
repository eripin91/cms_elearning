/* global AdminControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/get/:adminId', AdminControllers.getDetail)
  .post('/update/:adminId', AdminControllers.update)
  .post('/login', AdminControllers.login)

module.exports = Route
