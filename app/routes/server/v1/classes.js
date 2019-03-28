/* global ClassesControllers UploadControllers AuthHelper */

'use strict'

var Route = express.Router()
Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/get', ClassesControllers.get)
  .get('/select', ClassesControllers.getClassesSelect)
  .get('/get/:classId', ClassesControllers.getDetail)
  .get('/get-all-class', ClassesControllers.getAllClass)
  .post('/add', UploadControllers.upload.single('file'), ClassesControllers.insertClassUltimate)
  .patch('/update/:classId', UploadControllers.upload.single('file'), ClassesControllers.updateClass)
  .delete('/delete/:classId', ClassesControllers.deleteClass)

module.exports = Route
