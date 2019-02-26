'use strict'

module.exports = {
  get: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM classes_tab WHERE status = 1`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getDetail: (conn, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM classes_tab WHERE status = 1 AND classid = ?`, classId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  insertClass: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(connection)

      connection.query(`INSERT INTO classes_tab SET ?`, data, (err, rows) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { classid: rows.insertId }))
        }
      })
    })
  }
}
