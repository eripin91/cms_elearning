'use strict'

module.exports = {
  get: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM classes_tab`, (err, rows) => {
        callback(err, rows)
      })
    })
  }
}
