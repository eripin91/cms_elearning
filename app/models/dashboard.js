'use strict'

module.exports = {
  getUsers: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT COUNT(*) AS user FROM users_tab WHERE status = 1`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getClass: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT COUNT(*) AS class FROM classes_tab WHERE status = 1`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getCourses: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT COUNT(*) AS course FROM courses_tab WHERE status = 1`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getDiscussion: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT COUNT(*) AS discussion FROM discussion_tab WHERE parent=0 AND status = 1`, (err, rows) => {
        callback(err, rows)
      })
    })
  }
}
