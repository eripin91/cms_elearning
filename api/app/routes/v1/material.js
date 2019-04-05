/* global MaterialControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .get('/user/:userId', AuthHelper.requiresAuthorization, AuthHelper.requiresAccessToken, MaterialControllers.get)
  .post('/:userId/:classId/:detailId/:materialId', AuthHelper.requiresAuthorization, AuthHelper.requiresAccessToken, MaterialControllers.update)
  .post('/:userId/:materialId', AuthHelper.requiresAuthorization, AuthHelper.requiresAccessToken, MaterialControllers.updateUserDownloadMaterial)
module.exports = Route
