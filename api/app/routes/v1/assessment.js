/* global AssessmentControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/get/:assessmentId', AssessmentControllers.getDetail)
  .get('/get-questions/:parentId', AssessmentControllers.getQuestions)
  .get('/get-questions-number/:parentId/:userId', AssessmentControllers.getQuestionsNumber)
  .post('/get-questions-detail/:parentId', AssessmentControllers.getQuestionsDetail)
  .get('/rank/:classId', AssessmentControllers.getRank)
  .get('/result/:parentId', AssessmentControllers.getAssessmentResult)
  .post('/answer', AssessmentControllers.answer)

module.exports = Route
