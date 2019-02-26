/* global ClassesControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/get', ClassesControllers.get)
  .get('/get/:classId', ClassesControllers.getDetail)

module.exports = Route
