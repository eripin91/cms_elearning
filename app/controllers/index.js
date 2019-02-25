'use strict'

const fs = require('fs')
const path = require('path')

module.exports = (app) => {
  fs.readdirSync(app.config.ROOT + '/app/controllers/server').forEach((file) => {
    let extname = path.extname(file)
    let basename = path.basename(file, extname)
    if (~file.indexOf('.js') && basename !== 'index') {
      app.use(basename, require(app.config.ROOT + '/app/routes/server/' + file))
    }
  })

  fs.readdirSync(app.config.ROOT + '/app/controllers/client').forEach((file) => {
    let extname = path.extname(file)
    let basename = path.basename(file, extname)
    if (~file.indexOf('.js') && basename !== 'index') {
      app.use(basename, require(app.config.ROOT + '/app/routes/client/' + file))
    }
  })
}
