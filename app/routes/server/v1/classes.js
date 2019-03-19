/* global ClassesControllers UploadControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/get', ClassesControllers.get)
  .get('/get/:classId', ClassesControllers.getDetail)
  .post('/add', UploadControllers.upload.single('file'), ClassesControllers.insertClassUltimate)
  .patch('/update/:classId', UploadControllers.upload.single('file'), ClassesControllers.updateClass)
  .delete('/delete/:classId', ClassesControllers.deleteClass)

module.exports = Route
