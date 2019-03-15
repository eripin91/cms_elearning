/* global GuruControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  // .all('/*', AuthHelper.requiresAuthorization)
  .get('/get', GuruControllers.get)
  .get('/get/:guruId', GuruControllers.getDetail)
  .post('/add', GuruControllers.insertGuru)
  .patch('/update/:guruId', GuruControllers.updateGuru)
  .delete('/delete/:guruId', GuruControllers.deleteGuru)

module.exports = Route
