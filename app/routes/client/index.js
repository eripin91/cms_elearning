/* global MainControllers */

'use strict'

var Route = express.Router()

Route
  .get('/', MainControllers.main, MainControllers.getData)

module.exports = Route
