/* global ViewCoursesControllers */

'use strict'

const Route = express.Router()
const multer = require('multer')
const storage = multer.diskStorage({
  destination: './tmp/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'video/mp4') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
})

Route.get('/', ViewCoursesControllers.main)
  .get('/ajax/get', ViewCoursesControllers.ajaxGet)
  .get('/delete/:courseId', ViewCoursesControllers.delete)
  .get('/update/:courseId', ViewCoursesControllers.update)
  .post('/update', ViewCoursesControllers.update)
  .get('/add', ViewCoursesControllers.add)
  .post('/add', ViewCoursesControllers.add)

  .get('/chapter/:courseId', ViewCoursesControllers.chapterMain)
  .get('/chapter/ajax/get/:courseId', ViewCoursesControllers.chapterGetAll)
  .get('/chapter/delete/:courseId/:chapterId', ViewCoursesControllers.chapterDelete)
  .get('/chapter/update/:courseId/:chapterId', ViewCoursesControllers.chapterUpdate)
  .post('/chapter/update/:courseId/:chapterId', ViewCoursesControllers.chapterUpdate)
  .get('/chapter/add/:courseId', ViewCoursesControllers.chapterAdd)
  .post('/chapter/add/:courseId', ViewCoursesControllers.chapterAdd)

  .get('/chapter/:chapterId/lecture', ViewCoursesControllers.lectureMain)
  .get('/chapter/:chapterId/lecture/ajax/get/', ViewCoursesControllers.lectureGetAll)
  .get('/chapter/:chapterId/delete/:lectureId', ViewCoursesControllers.lectureDelete)
  .get('/chapter/:chapterId/update/:lectureId', ViewCoursesControllers.lectureUpdate)
  .post('/chapter/:chapterId/update/:lectureId', upload.single('file'), ViewCoursesControllers.lectureUpdate)
  .get('/chapter/:chapterId/add', ViewCoursesControllers.lectureAdd)
  .post('/chapter/:chapterId/add', upload.single('file'), ViewCoursesControllers.lectureAdd)
module.exports = Route
