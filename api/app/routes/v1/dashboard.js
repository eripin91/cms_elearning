/* global DashboardControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/:userId', DashboardControllers.get)

module.exports = Route
