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

  .get('/chapter/:courseId', ViewCoursesControllers.chapterMain)
  .get('/chapter/ajax/get/:courseId', ViewCoursesControllers.chapterGetAll)
  // .get('/chapter/:courseId', ViewCoursesControllers.chapterGetAll)
  // .get('/chapter/update/:chapterId', ViewCoursesControllers.chapterGetAll)

// .get('/chapter/:chapterId/lecture', ViewCoursesControllers.lectureGetAll)
module.exports = Route
