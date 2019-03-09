'use strict'

module.exports = {
  get: (conn, limit, offset, keyword, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT * FROM users_tab WHERE status=1 AND (email LIKE '%${keyword}%' OR fullname LIKE '%${keyword}%' OR phone LIKE '%${keyword}%') ORDER BY userid DESC LIMIT ${offset},${limit}`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getTotalUser: (conn, keyword, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT COUNT(*) as total FROM users_tab WHERE status=1 AND (email LIKE '%${keyword}%' OR fullname LIKE '%${keyword}%' OR phone LIKE '%${keyword}%')`, (err, rows) => {
        callback(err, rows)
      })
    })
  }
}
