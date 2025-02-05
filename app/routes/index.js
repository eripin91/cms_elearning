'use strict'

const fs = require('fs')
const path = require('path')

module.exports = (app) => {
  fs.readdirSync(app.config.ROOT + '/app/routes/server/v1').forEach((file) => {
    let extname = path.extname(file)
    let basename = path.basename(file, extname)
    if (~file.indexOf('.js') && basename !== 'index') {
      app.use('/v1/' + basename, require(app.config.ROOT + '/app/routes/server/v1/' + file))
    }
  })

  fs.readdirSync(app.config.ROOT + '/app/routes/client').forEach((file) => {
    let extname = path.extname(file)
    let basename = path.basename(file, extname)
    if (~file.indexOf('.js') && basename !== 'index') {
      app.use('/' + basename, require(app.config.ROOT + '/app/routes/client/' + file))
    } else {
      app.use('/', require(app.config.ROOT + '/app/routes/client/' + file))
    }
  })
}
