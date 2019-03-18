'use strict'

module.exports = {
  get: (conn, limit, offset, keyword, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      let sql = ''

      if (!_.isEmpty(keyword)) {
        sql = ` AND (a.email LIKE '%${keyword}%' OR a.fullname LIKE '%${keyword}%' OR a.phone LIKE '%${keyword}%')`
      }

      if (classId > 0) {
        sql = ` AND b.classid=${classId}`
      }

      connection.query(`SELECT a.*, b.score FROM users_tab a LEFT JOIN users_classes_tab b ON a.userid=b.userid WHERE a.status=1 ${sql} ORDER BY a.userid DESC LIMIT ${offset},${limit}`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getTotalUser: (conn, keyword, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      let sql = ''

      if (!_.isEmpty(keyword)) {
        sql = ` AND (a.email LIKE '%${keyword}%' OR a.fullname LIKE '%${keyword}%' OR a.phone LIKE '%${keyword}%')`
      }

      if (classId > 0) {
        sql = ` AND b.classid=${classId}`
      }

      connection.query(`SELECT COUNT(*) as total FROM users_tab a LEFT JOIN users_classes_tab b ON a.userid=b.userid WHERE a.status=1 ${sql}`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  update: (conn, id, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('UPDATE users_tab SET ? WHERE userid = ? ', [data, id], (errUpdate, resultUpdate) => {
        callback(errUpdate, resultUpdate.affectedRows > 0 ? _.merge(data, { userid: id }) : [])
      })
    })
  }
}
