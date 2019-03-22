/* global AdminControllers AuthHelper */

'use strict'

var Route = express.Router()

// Route.all('/*')
Route.all('/*', AuthHelper.requiresAuthorization)
  .get('/get', AdminControllers.get)
  .get('/get/:adminId', AdminControllers.getDetail)
  .post('/create', AdminControllers.create)
  .post('/update/:adminId', AdminControllers.update)
  .get('/delete/:adminId', AdminControllers.delete)
  .post('/login', AdminControllers.login)

module.exports = Route
