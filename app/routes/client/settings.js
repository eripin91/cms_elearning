/* global SettingsControllers */

'use strict'

var Route = express.Router()

Route
  .get('/', SettingsControllers.main)
  .post('/update', SettingsControllers.update)

module.exports = Route
