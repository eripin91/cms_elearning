/* global PagesControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/get/:slug', PagesControllers.get)

module.exports = Route
