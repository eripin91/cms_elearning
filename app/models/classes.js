'use strict'

module.exports = {
  get: (conn, limit, offset, keyword, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT a.classid, a.guruid, b.courseid, c.fullname AS guru, a.name AS class_name, b.name AS course_name, a.description, a.cover, a.priority, a.rating, a.created_at, a.updated_at FROM classes_tab a LEFT JOIN courses_tab b on a.classid=b.classid JOIN guru_tab c on a.guruid=c.guruid WHERE a.status = 1 AND (a.name LIKE '%${keyword}%' OR c.fullname LIKE '%${keyword}%') ORDER BY a.classid DESC LIMIT ${offset}, ${limit}`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getTotalClass: (conn, keyword, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT COUNT(*) as total FROM classes_tab a JOIN guru_tab b on a.guruid=b.guruid WHERE a.status=1 AND (a.name LIKE '%${keyword}%' OR b.fullname LIKE '%${keyword}%')`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getDetail: (conn, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT a.classid, a.guruid, b.courseid, c.fullname As guru, a.name AS class_name, b.name AS course_name, a.description, a.cover, a.priority, a.rating, a.created_at, b.updated_at FROM classes_tab a LEFT JOIN courses_tab b on a.classid=b.classid LEFT JOIN guru_tab c on a.guruid=c.guruid WHERE a.status = 1 AND a.classid = ?`, classId, (err, rows) => {
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
  getAllClass: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT classid, name FROM classes_tab WHERE status = 1`, (err, rows) => {
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

      connection.query(`UPDATE classes_tab SET status = 0, updated_at = NOW() WHERE classid = ?`, classId, (err) => {
        callback(err, { message: 'Data has been deleted' })
      })
    })
  }
}
