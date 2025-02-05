/* global _ sauth */

const register = Handlebars => {
  const helpers = {
    themes_url: str => {
      return CONFIG.SERVER.BASE_WEBHOST + 'assets/' + str
    },
    site_url: str => {
      return CONFIG.SERVER.BASE_WEBHOST + str
    },
    site_url_params: (str, params) => {
      return CONFIG.SERVER.BASE_WEBHOST + str + params
    },
    site_url_two_params: (str, param1, param2) => {
      return CONFIG.SERVER.BASE_WEBHOST + str + param1 + '/' + param2
    },
    add_params: (str, params) => {
      return str + params
    },
    params_inside_string: (str, params) => {
      return 'courses/chapter/' + params + str
    },
    url_params_inside_string: (params, str) => {
      return CONFIG.SERVER.BASE_WEBHOST + 'courses/chapter/' + params + str
    },
    url_two_params_inside_string: (param1, str, param2) => {
      return CONFIG.SERVER.BASE_WEBHOST + 'courses/chapter/' + param1 + str + param2
    },
    if_cond: (a, b, options) => {
      if (a === b) { return options.fn(this) }
      return options.inverse(this)
    },
    implode: (sep, arr) => {
      let str = ''
      for (let i = 0; i < arr.length; ++i) {
        let index = parseInt(arr[i])
        if (!isNaN(index)) {
          if (index > 0) {
            str += index + sep
          }
        }
      }
      if (str) {
        str = str.slice(0, -1)
      } else {
        str = 0
      }
      return str
    },
    strpad: (pad, str, padLeft) => {
      if (typeof str === 'undefined') return pad

      if (padLeft) {
        return (pad + str).slice(-pad.length)
      } else {
        return (str + pad).substring(0, pad.length)
      }
    },
    addZero: i => {
      if (i < 10) {
        i = '0' + i
      }
      return i
    },
    get_date_now: () => {
      return Math.floor(Date.now() / 1000)
    },
    get_date: (unixTimestamp, format) => {
      if (!unixTimestamp) unixTimestamp = helpers.get_date_now()
      if (!format) format = 1
      let today = new Date(unixTimestamp)
      let dd = today.getDate()
      let mm = today.getMonth() + 1 // January is 0!
      let yyyy = today.getFullYear()

      if (dd < 10) {
        dd = '0' + dd
      }

      if (mm < 10) {
        mm = '0' + mm
      }

      if (format === 1) {
        today = dd + '/' + mm + '/' + yyyy
      } else {
        today =
          dd +
          '/' +
          mm +
          '/' +
          yyyy +
          ' ' +
          helpers.addZero(today.getHours()) +
          ':' +
          helpers.addZero(today.getMinutes())
      }

      return today
    },
    global_login: key => {
      return sauth[key]
    },
    parse_json: (json, key) => {
      const obj = JSON.parse(json)
      return obj[key]
    },
    check_permission: perm => {
      for (let i = 0; i < _.size(sauth.perms); ++i) {
        if (_.result(sauth.perms[i], 'perm') === perm) {
          return sauth.perms[i].access === 1
        }
      }
      return false
    },
    compare: (lvalue, rvalue, options) => {
      let operator = options.hash.operator || '=='

      let operators = {
        '==': (l, r) => {
          return l === r
        },
        '===': (l, r) => {
          return l === r
        },
        '!=': (l, r) => {
          return l !== r
        },
        '<': (l, r) => {
          return l < r
        },
        '>': (l, r) => {
          return l > r
        },
        '<=': (l, r) => {
          return l <= r
        },
        '>=': (l, r) => {
          return l >= r
        }
      }

      if (!operators[operator]) {
        throw new Error(
          "Handlerbars Helper 'compare' doesn't know the operator " + operator
        )
      }

      const result = operators[operator](lvalue, rvalue)

      if (result) {
        return options.fn(this)
      } else {
        return options.inverse(this)
      }
    },
    getStatus: (status, type) => {
      if (type === 1) {
        return status === 1 ? 'Active' : 'Inactive'
      } else {
        return status === 1
          ? 'Active <input type="radio" checked="checked" name="status" value="1" /> Inactive <input type="radio" name="status" value="0" />'
          : 'Active <input type="radio" name="status" value="1" /> Inactive <input type="radio" checked="checked" name="status" value="0" />'
      }
    },
    get_roles: roles => {
      return true
    },
    showLog: log => {
      console.log('LOG HELPER')
      console.log(log)
    },
    inc: (value) => {
      return parseInt(value) + 1
    },
    checkRadioAnswer: (answer) => {
      return answer === true ? 'checked' : ''
    }
  }

  if (Handlebars && typeof Handlebars.registerHelper === 'function') {
    for (let prop in helpers) {
      Handlebars.registerHelper(prop, helpers[prop])
    }
  } else {
    return helpers
  }
}

module.exports.register = register
module.exports.helpers = register(null)
