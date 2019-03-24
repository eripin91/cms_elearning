/* global ClassesControllers AuthHelper */

'use strict'

var Route = express.Router()
Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/get', ClassesControllers.get)
  .get('/get/:classId', ClassesControllers.getDetail)
  .post('/add', ClassesControllers.insertClassUltimate)
  .patch('/update/:classId', ClassesControllers.updateClass)
  .delete('/delete/:classId', ClassesControllers.deleteClass)

module.exports = Route
