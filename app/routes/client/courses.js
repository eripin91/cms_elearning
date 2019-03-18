/* global ViewCoursesControllers */

'use strict'

var Route = express.Router()

Route.get('/', ViewCoursesControllers.main)
  .get('/ajax/get', ViewCoursesControllers.ajaxGet)
  .get('/delete/:CoursesId', ViewCoursesControllers.delete)
  .get('/add', ViewCoursesControllers.add)
  .post('/add', ViewCoursesControllers.add)
  .get('/update/:CoursesId', ViewCoursesControllers.update)
  .post('/update', ViewCoursesControllers.update)

module.exports = Route
