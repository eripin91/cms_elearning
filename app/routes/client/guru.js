/* global ViewGuruControllers */

'use strict'

var Route = express.Router()

Route
  .get('/', ViewGuruControllers.main)
  .get('/ajax/get', ViewGuruControllers.ajaxGet)
  .get('/delete/:guruId', ViewGuruControllers.delete)
  .get('/update/:guruId', ViewGuruControllers.update)
  .post('/update', ViewGuruControllers.update)
  .get('/add', ViewGuruControllers.add)
  .post('/add', ViewGuruControllers.add)

module.exports = Route
