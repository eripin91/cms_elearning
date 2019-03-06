/* global _ helpers */

'use strict'

const upload = require('../../helper/upload')

const singleUpload = upload.single('file')

exports.uploadAws = (req, res) => {
  singleUpload(req, res, (err) => {
    if (err) {
      MiscHelper.errorCustomStatus(res, err, 400)
    } else {
      return MiscHelper.responses(res, { fileUrl: req.file.location })
    }
  })
}
