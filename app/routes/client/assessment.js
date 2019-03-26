/* global ViewAssessmentControllers */

'use strict'

var Route = express.Router()

Route
  .get('/', ViewAssessmentControllers.main)
  .get('/ajax/get', ViewAssessmentControllers.ajaxGet)
  .get('/delete/:assessmentId', ViewAssessmentControllers.delete)
  .get('/add', ViewAssessmentControllers.add)
  .post('/add', ViewAssessmentControllers.add)
  .get('/update/:assessmentId', ViewAssessmentControllers.update)
  .post('/update', ViewAssessmentControllers.update)
  .get('/question/:assessmentId', ViewAssessmentControllers.questionsList)
  .post('/question/add', ViewAssessmentControllers.questionsList)

module.exports = Route
