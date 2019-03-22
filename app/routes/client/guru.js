/* global ViewGuruControllers */

'use strict'

var Route = express.Router()

Route
  .get('/', ViewGuruControllers.main)
  .get('/ajax/get', ViewGuruControllers.ajaxGet)

module.exports = Route
