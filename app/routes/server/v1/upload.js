/* global UploadControllers */

'use strict'

var Route = express.Router()

Route
  .post('/', UploadControllers.uploadAws)
  .post('/photo', UploadControllers.uploadImage)

module.exports = Route
