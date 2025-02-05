'use strict'

const PORT = 3002
const BASE_DOMAIN = process.env.BASE_DOMAIN || '0.0.0.0'
const PROTOCOL = process.env.PROTOCOL || 'https'

const CONFIG = {
  SERVER: {
    PORT: PORT,
    BASE_DOMAIN: BASE_DOMAIN,
    BASE_WEBHOST: `${PROTOCOL}://${BASE_DOMAIN}/`
  }
}

module.exports = CONFIG
