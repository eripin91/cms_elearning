/* global AssessmentControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/', AssessmentControllers.getAssessment)
  .get('/select', AssessmentControllers.getAssessmentSelect)
  .get('/:assessmentId', AssessmentControllers.getAssessmentDetail)
  .get('/course/:courseId', AssessmentControllers.getAssessmentCourse)
  .post('/create', AssessmentControllers.insertAssessment)
  .post('/update/:assessmentId', AssessmentControllers.updateAssessment)
  .get('/delete/:assessmentId', AssessmentControllers.deleteAssessment)
  .get('/question-list/:assessmentId', AssessmentControllers.getDetailAssessment)
  .get('/question/:detailId', AssessmentControllers.getSoal)
  .post('/question/:assessmentId', AssessmentControllers.insertSoal)
  .patch('/question/:detailId', AssessmentControllers.updateSoal)
  .get('/question/delete/:detailId', AssessmentControllers.deleteSoal)

module.exports = Route
