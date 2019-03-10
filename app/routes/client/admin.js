/* global ViewAdminControllers */

'use strict'

var Route = express.Router()

Route
  .get('/', ViewAdminControllers.main)
  .get('/ajax/get', ViewAdminControllers.ajaxGet)
  .get('/delete/:adminId', ViewAdminControllers.delete)
  .get('/add', ViewAdminControllers.add)
  .post('/add', ViewAdminControllers.add)
  .get('/update/:adminId', ViewAdminControllers.update)
  .post('/update', ViewAdminControllers.update)

module.exports = Route
