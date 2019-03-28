/* global PagesControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/get', PagesControllers.get)
  .get('/get/:pageId', PagesControllers.getDetail)
  .post('/update/:pageId', PagesControllers.update)

module.exports = Route
