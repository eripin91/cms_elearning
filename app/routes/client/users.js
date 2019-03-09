/* global ViewUsersControllers */

'use strict'

var Route = express.Router()

Route
  .get('/', ViewUsersControllers.main)
  .get('/ajax/get', ViewUsersControllers.ajaxGet)

module.exports = Route
