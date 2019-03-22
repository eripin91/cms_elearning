/* global ViewPagesControllers */

'use strict'

var Route = express.Router()

Route
  .get('/', ViewPagesControllers.main)
  .get('/ajax/get', ViewPagesControllers.ajaxGet)
  .get('/update/:pageId', ViewPagesControllers.update)
  .post('/update', ViewPagesControllers.update)

module.exports = Route
