/* global ViewDiscussionsControllers */

'use strict'

var Route = express.Router()

Route
  .get('/', ViewDiscussionsControllers.main)
  .get('/ajax/get', ViewDiscussionsControllers.ajaxGet)
  .get('/detail/:discussionId', ViewDiscussionsControllers.detail)
  .get('/update/:discussionId', ViewDiscussionsControllers.update)
  .post('/update', ViewDiscussionsControllers.update)
  .get('/delete/:discussionId', ViewDiscussionsControllers.delete)

module.exports = Route
