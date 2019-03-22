/* global ViewClassesControllers */

'use strict'

var Route = express.Router()

Route.get('/', ViewClassesControllers.main)
  .get('/ajax/get', ViewClassesControllers.ajaxGet)
  .get('/delete/:classId', ViewClassesControllers.delete)
  .get('/add', ViewClassesControllers.add)
  .post('/add', ViewClassesControllers.add)
  .get('/update/:classId', ViewClassesControllers.update)
  .post('/update', ViewClassesControllers.update)

module.exports = Route
