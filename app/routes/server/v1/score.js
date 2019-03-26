/* global ScoreControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/:courseId', ScoreControllers.getusersScore)

module.exports = Route
