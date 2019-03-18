/* global ViewCoursesControllers */

'use strict'

var Route = express.Router()

Route.get('/', ViewCoursesControllers.main)
  .get('/ajax/get', ViewCoursesControllers.ajaxGet)
  .get('/delete/:courseId', ViewCoursesControllers.delete)
  .get('/add', ViewCoursesControllers.add)
  .post('/add', ViewCoursesControllers.add)
  .get('/update/:courseId', ViewCoursesControllers.update)
  .post('/update', ViewCoursesControllers.update)

module.exports = Route
