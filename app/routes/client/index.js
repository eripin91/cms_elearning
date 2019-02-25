/* global MainControllers */

'use strict'

var Route = express.Router()

Route
  .get('/', MainControllers.main)

module.exports = Route
