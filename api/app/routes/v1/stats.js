/* global StatsControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/get/:userId', AuthHelper.requiresAccessToken, StatsControllers.get)
  .get('/certificate/:userId/:classId', AuthHelper.requiresAccessToken, StatsControllers.getCertificate)
  .get('/certificate/:userId', AuthHelper.requiresAccessToken, StatsControllers.getCertificateList)
  .get('/rank/:userId', AuthHelper.requiresAccessToken, StatsControllers.getRank)

module.exports = Route
