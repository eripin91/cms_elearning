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

      connection.query(`SELECT a.classid, a.guruid, b.courseid, a.name AS class_name, b.name AS course_name, a.description, a.cover, a.priority, a.rating, a.created_at, b.updated_at FROM classes_tab a JOIN courses_tab b on a.classid=b.classid  WHERE a.status = 1 AND a.classid = ?`, classId, (err, rows) => {
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
  },
  checkClass: (conn, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM classes_tab WHERE status = 1 AND classid = ? LIMIT 1`, classId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  updateClass: (conn, data, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`UPDATE classes_tab SET ? WHERE classid = ?`, [data, classId], (err, rows) => {
        callback(err, rows.affectedRows > 0 ? _.merge(data, { classid: classId }) : [])
      })
    })
  },
  deleteClass: (conn, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`UPDATE classes_tab SET status = 0 WHERE classid = ?`, classId, (err) => {
        callback(err, { message: 'Data has been deleted' })
      })
    })
  }
}
