/* global AssessmentControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/', AssessmentControllers.getAssessment)
  .get('/:assessmentId', AssessmentControllers.getAssessmentDetail)
  .post('/', AssessmentControllers.insertAssessment)
  .patch('/:assessmentId', AssessmentControllers.updateAssessment)
  .delete('/:assessmentId', AssessmentControllers.deleteAssessment)

module.exports = Route
