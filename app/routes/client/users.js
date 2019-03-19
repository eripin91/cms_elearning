/* global ViewUsersControllers */

'use strict'

var Route = express.Router()

Route
  .get('/', ViewUsersControllers.main)
  .get('/ajax/get', ViewUsersControllers.ajaxGet)
  .get('/delete/:userId', ViewUsersControllers.delete)

module.exports = Route
