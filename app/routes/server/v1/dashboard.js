/* global DashboardControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  // .all('/*', AuthHelper.requiresAuthorization)
  .get('/', DashboardControllers.get)

module.exports = Route
