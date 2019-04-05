/* global MateriControllers */

'use strict'

var Route = express.Router()

Route
  .get('', MateriControllers.get)
  .patch('/:idMaterial', MateriControllers.update)

module.exports = Route
