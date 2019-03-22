/* global ViewGuruControllers */

'use strict'

var Route = express.Router()

Route
  .get('/', ViewGuruControllers.main)
  .get('/ajax/get', ViewGuruControllers.ajaxGet)
  .get('/delete/:guruId', ViewGuruControllers.delete)

module.exports = Route
