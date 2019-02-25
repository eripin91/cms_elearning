/* global LoginControllers */

'use strict'

var Route = express.Router()

Route
  .get('/', LoginControllers.main)
  .get('/logging', LoginControllers.main)
  .get('/logout', LoginControllers.logout)
  .post('/logging', LoginControllers.logging)

module.exports = Route
