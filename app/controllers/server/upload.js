/* global _ helpers */

'use strict'

const upload = require('../../helper/upload')

const singleUpload = upload.single('file')

exports.uploadAws = (req, res) => {
  singleUpload(req, res, (err) => {
    if (err) {
      return MiscHelper.errorCustomStatus(res, err, 400)
    } else {
      return MiscHelper.responses(res, { key: req.file.key, fileUrl: req.file.location, size: req.file.size })
    }
  })
}
