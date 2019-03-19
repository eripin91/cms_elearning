/* global UploadControllers */

'use strict'

var Route = express.Router()

Route
  .post('/', UploadControllers.uploadAws)

module.exports = Route
