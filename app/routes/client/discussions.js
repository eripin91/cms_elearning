/* global ViewDiscussionsControllers */

'use strict'

var Route = express.Router()

Route
  .get('/', ViewDiscussionsControllers.main)
  .get('/ajax/get', ViewDiscussionsControllers.ajaxGet)

module.exports = Route
