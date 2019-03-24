/* global AssessmentControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/', AssessmentControllers.getAssessment)
  .get('/:assessmentId', AssessmentControllers.getAssessmentDetail)
  .get('/course/:courseId', AssessmentControllers.getAssessmentCourse)
  .post('/', AssessmentControllers.insertAssessment)
  .patch('/:assessmentId', AssessmentControllers.updateAssessment)
  .delete('/:assessmentId', AssessmentControllers.deleteAssessment)
  .get('/question-list/:assessmentId', AssessmentControllers.getDetailAssessment)
  .get('/question/:detailId', AssessmentControllers.getSoal)
  .post('/question/:assessmentId', AssessmentControllers.insertSoal)
  .patch('/question/:detailId', AssessmentControllers.updateSoal)
  .delete('/question/:detailId', AssessmentControllers.deleteSoal)

module.exports = Route
