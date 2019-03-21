'use strict'

module.exports = {
  getAssessment: (conn, limit, offset, keyword, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT at.assessmentid, at.parentid, c.name AS course_name, at.title, at.duration FROM assessment_tab at JOIN courses_tab c ON at.parentid = c.courseid WHERE (at.title LIKE '%${keyword}%' OR c.name LIKE '%${keyword}%') AND at.status = 1 ORDER BY at.assessmentid LIMIT ${offset}, ${limit}`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getTotalAssessment: (conn, keyword, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT COUNT(*) AS total FROM assessment_tab at JOIN courses_tab c ON at.parentid = c.courseid WHERE (at.title LIKE '%${keyword}%' OR c.name LIKE '%${keyword}%')`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getAssessmentDetail: (conn, assessmentId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM assessment_tab at JOIN courses_tab c ON at.parentid = c.courseid WHERE assessmentid = ${assessmentId} AND status = 1`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  insertAssessment: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`INSERT INTO assessment_tab SET ${data}`, (err, rows) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { id: rows.insertId }))
        }
      })
    })
  },
  updateAssessment: (conn, id, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(connection)

      connection.query(`UPDATE assessment_tab SET ${data} WHERE assessmentid = ${id}`, (err, rows) => {
        callback(err, rows.affectedRows > 0 ? _.merge(data, { assessmentid: id }) : [])
      })
    })
  },
  deleteAssessment: (conn, id, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(connection)

      connection.query(`UPDATE assessment_tab SET status = 0 WHERE assessmentid = ${id}`, (err, rows) => {
        callback(err, { message: 'data has been deleted' })
      })
    })
  }
}
