/* global ViewSettingsControllers */

'use strict'

var Route = express.Router()

Route
  .get('/', ViewSettingsControllers.main)
  .post('/update', ViewSettingsControllers.update)

module.exports = Route
