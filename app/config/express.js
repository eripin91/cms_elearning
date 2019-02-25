/* global CONFIG, env helpers */

'use strict'

const compression = require('compression')()
const bodyParser = require('body-parser')
const path = require('path')
const async = require('async')
const expressValidator = require('express-validator')
const xssFilter = require('x-xss-protection')()
const nocache = require('nocache')()
const uuidV4 = require('uuid/v4')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const exphbs = require('express-handlebars')
const cors = require('cors')

global.helpers = require('../libs/handlebars').helpers
global.redisCache = require('../libs/RedisCache')
global.sauth = {}

const parallelMiddleware = middlewares => (req, res, next) => async.each(middlewares, (mw, cb) => mw(req, res, cb), next)
const viewsPath = path.join(CONFIG.ROOT, 'app', 'views')

module.exports = (app) => {
  app.set('views', viewsPath)
  app.set('env', env)
  app.set('port', CONFIG.SERVER.PORT)

  const hbs = exphbs.create({
    helpers: helpers,
    defaultLayout: 'main',
    extname: 'hbs',
    layoutsDir: `${viewsPath}/layouts/`,
    partialsDir: `${viewsPath}/partials/`
  })

  app.engine('.hbs', hbs.engine)
  app.set('view engine', '.hbs')
  app.use(cors())

  app.use('/assets', express.static('assets'))

  app.use(session({
    store: new RedisStore(CONFIG.REDIS),
    secret: 'keyboard cat',
    resave: false
  }))

  app.use((req, res, next) => {
    if (/^\/v1\//.test(req.path) === true) {
      return next()
    }

    if (/\/login/.test(req.path) === false) {
      global.sauth = req.session.login
      if (!req.session.login) {
        return res.redirect('/login')
      } else {
        if (!req.session.login.adminid || !req.session.login.email) {
          return res.redirect('/login')
        }

        for (let i = 0; i < global.sauth.perms.length; ++i) {
          if (global.sauth.perms[i].url != null) {
            let pattern = global.sauth.perms[i].url
            let regex = new RegExp(pattern, 'g')
            if (regex.test(req.path) === true) {
              if (req.path !== '/' && /\/ajax/.test(req.path) === false) {
                if (global.sauth.perms[i].access !== 1) {
                  return res.redirect('/')
                }
                break
              }
            }
          }
        }
      }
    } else {
      if (req.session.login) {
        if (/\/login/.test(req.path) === true) {
          if (/\/login\/logout/.test(req.path) === false) {
            return res.redirect('/')
          }
        }
      }
    }
    return next()
  })

  app.use(parallelMiddleware([
    xssFilter,
    nocache,
    bodyParser.json({ limit: '2mb' }),
    bodyParser.urlencoded({ extended: true, limit: '2mb', parameterLimit: 1000 }),
    compression,
    expressValidator({
      customValidators: {
        isMatch: function (param1, param2) { return param1 === param2 }
      }
    })
  ]))

  if (app.get('env') === 'development') {
    const morgan = require('morgan')
    const responseTime = require('response-time')()
    const errorHandler = require('errorhandler')()

    app.use(morgan('dev'))
    app.use(responseTime)
    app.use(errorHandler)
  }

  require(CONFIG.ROOT + '/app/routes')(app)

  app.use((err, req, res, next) => {
    if (err.message && (~err.message.indexOf('not found') || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next()
    }

    const errorResults = {}

    errorResults.message = err.stack
    errorResults.status = 500
    errorResults.id = uuidV4()

    return res.status(500).send(errorResults)
  })

  // assume 404 since no middleware responded
  app.use((req, res, next) => {
    res.render('404', { status: 404, url: req.url })
  })
}
