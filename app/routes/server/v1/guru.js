/* global GuruControllers UploadControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  // .all('/*', AuthHelper.requiresAuthorization)
  .get('/get', GuruControllers.get)
  .get('/get/:guruId', GuruControllers.getDetail)
  .post('/add', UploadControllers.upload.single('file'), GuruControllers.insertGuru)
  .patch('/update/:guruId', UploadControllers.upload.single('file'), GuruControllers.updateGuru)
  .delete('/delete/:guruId', GuruControllers.deleteGuru)

module.exports = Route
