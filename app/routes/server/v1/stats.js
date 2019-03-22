/* global StatsControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/get/:userId', StatsControllers.getDetail)

module.exports = Route
