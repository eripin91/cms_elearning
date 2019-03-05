'use strict'

const BASE_DOMAIN = process.env.BASE_DOMAIN || '0.0.0.0'

const CONFIG = {
  ROOT: process.cwd(),
  APP: {
    name: BASE_DOMAIN
  },
  DATABASE: {
    HOST: process.env.DATABASE_HOST,
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWORD,
    DB: process.env.DATABASE_NAME
  },
  REDIS: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    options: {
      db: 0
    },
    auth_pass: process.env.REDIS_PASSWORD
  },
  AWS: {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_ACCESS_KEY_SECRET: process.env.AWS_ACCESS_KEY_SECRET
  },
  SESSION_SECRET: process.env.SESSION_SECRET || 'zd_TEkgW5C_$8]j.',
  REQUEST_HEADERS: {
    Authorization: 'X-COURSES-API'
  },
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  MAILGUN: {
    DOMAIN: process.env.MAILGUN_DOMAIN,
    API_KEY: process.env.MAILGUN_API_KEY
  },
  CHIPPER: 'X-TELKOM-SIGMA-ARKADEMY'
}

module.exports = CONFIG
