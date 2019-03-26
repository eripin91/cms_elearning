
/* global ViewAssessmentControllers */

'use strict'

var Route = express.Router()

Route
  .get('/', ViewAssessmentControllers.main)
  .get('/ajax/get', ViewAssessmentControllers.ajaxGet)
  .get('/delete/:assessmentId', ViewAssessmentControllers.delete)
  .get('/delete/question/:assessmentId/:detailId', ViewAssessmentControllers.deleteQuestion)
  .get('/add', ViewAssessmentControllers.add)
  .post('/add', ViewAssessmentControllers.add)
  .get('/update/:assessmentId', ViewAssessmentControllers.update)
  .post('/update', ViewAssessmentControllers.update)

module.exports = Route
