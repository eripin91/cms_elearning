'use strict'

const request = require('request')
const { assignIn, result } = require('lodash')

const createClient = config => {
  const api = {}

  if (!config) {
    throw new Error(`Api libs need a config object`)
  }

  if (!config.baseUrl) {
    throw new Error(`please provide "baseUrl" property in config`)
  }

  api.baseUrl = config.baseUrl
  api.defaultHeaders = config.headers

  api.get = (url, data, headers, callback) => {
    if (typeof data === 'function') {
      callback = data
      headers = {}
      data = {}
    }

    if (typeof headers === 'function') {
      callback = headers
      headers = {}
    }

    if (typeof callback !== 'function') {
      throw new Error(`please provide callback function to this method`)
    }

    const options = {
      method: 'GET',
      url: api.baseUrl + url,
      qs: data,
      headers: assignIn(api.defaultHeaders, headers || {})
    }

    request(options, (err, response, body) => {
      const statusCode = result(response, 'statusCode')

      if (err || statusCode !== 200) {
        if (err) {
          if (result(err, 'code') === 'ECONNREFUSED') {
            return callback(err || body, null)
          } else {
            return callback(
              new Error('Thats an error \n Please try again later.'),
              null
            )
          }
        } else if (statusCode === 404) {
          return callback(new Error('page not found'), null)
        } else {
          return callback(err || body, null)
        }
      } else {
        try {
          const output = JSON.parse(body)

          if (output && typeof callback === 'function') {
            return callback(null, output)
          }
        } catch (err) {
          if (typeof callback === 'function') {
            const errorMessage = {
              status: 503,
              message:
                'The server is currently unavailable because it is overloaded or down for maintenance'
            }
            return callback(errorMessage, null)
          }
        }
      }
    })
  }

  api.post = (url, data, headers, callback) => {
    if (typeof data === 'function') {
      callback = data
      headers = {}
      data = {}
    }

    if (typeof headers === 'function') {
      callback = headers
      headers = {}
    }

    const options = {
      url: api.baseUrl + url,
      method: 'POST',
      form: data,
      headers: assignIn(api.defaultHeaders, headers || {})
    }

    request(options, (err, response, body) => {
      const statusCode = result(response, 'statusCode')
      let errorMessage = {
        status: 503,
        message:
          'The server is currently unavailable because it is overloaded or down for maintenance'
      }

      if (err || statusCode !== 200) {
        try {
          const errorOutput = JSON.parse(body)
          if (typeof callback === 'function') {
            return callback(errorOutput, null)
          } else {
            return true
          }
        } catch (err) {
          if (typeof callback === 'function') {
            return callback(errorMessage, null)
          } else {
            return true
          }
        }
      } else {
        try {
          const output = JSON.parse(body)
          if (output && output.data && typeof callback === 'function') {
            return callback(null, output)
          } else {
            return callback(null, output)
          }
        } catch (err) {
          if (typeof callback === 'function') {
            return callback(errorMessage, null)
          }
        }

        return true
      }
    })
  }

  api.patch = (url, data, headers, callback) => {
    if (typeof data === 'function') {
      callback = data
      headers = {}
      data = {}
    }

    if (typeof headers === 'function') {
      callback = headers
      headers = {}
    }

    const options = {
      url: api.baseUrl + url,
      method: 'PATCH',
      form: data,
      headers: assignIn(api.defaultHeaders, headers || {})
    }

    request(options, (err, response, body) => {
      const statusCode = result(response, 'statusCode')
      let errorMessage = {
        status: 503,
        message:
          'The server is currently unavailable because it is overloaded or down for maintenance'
      }

      if (err || statusCode !== 200) {
        try {
          const errorOutput = JSON.parse(body)
          if (typeof callback === 'function') {
            return callback(errorOutput, null)
          } else {
            return true
          }
        } catch (err) {
          if (typeof callback === 'function') {
            return callback(errorMessage, null)
          } else {
            return true
          }
        }
      } else {
        try {
          const output = JSON.parse(body)
          if (output && output.data && typeof callback === 'function') {
            return callback(null, output)
          } else {
            return callback(null, output)
          }
        } catch (err) {
          if (typeof callback === 'function') {
            return callback(errorMessage, null)
          }
        }

        return true
      }
    })
  }
  return api
}

module.exports = {
  client: createClient
}
