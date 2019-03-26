'use strict'

module.exports = {
  getAssessment: (conn, limit, offset, keyword, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT at.assessmentid, at.parentid, c.name AS course_name, at.title, at.duration, at.created_at, at.updated_at FROM assessment_tab at LEFT JOIN courses_tab c ON at.parentid = c.courseid WHERE (at.title LIKE '%${keyword}%' OR c.name LIKE '%${keyword}%') AND at.status = 1 ORDER BY at.assessmentid LIMIT ${offset}, ${limit}`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getAssessmentSelect: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT assessmentid as id, title FROM assessment_tab WHERE status=1 AND parentid=0`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getTotalAssessment: (conn, keyword, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT COUNT(*) AS total FROM assessment_tab at LEFT JOIN courses_tab c ON at.parentid = c.courseid WHERE (at.title LIKE '%${keyword}%' OR c.name LIKE '%${keyword}%')`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getAssessmentDetail: (conn, assessmentId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT c.name AS course_name, at.* FROM assessment_tab at LEFT JOIN courses_tab c ON at.parentid = c.courseid WHERE assessmentid = ${assessmentId} AND at.status = 1`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getAssessmentByCourse: (conn, courseId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT at.assessmentid, at.title FROM assessment_tab at LEFT JOIN courses_tab c ON at.parentid = c.courseid WHERE at.parentid = ${courseId}`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  insertAssessment: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`INSERT INTO assessment_tab SET ?`, [data], (err, rows) => {
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

      connection.query(`UPDATE assessment_tab SET ? WHERE assessmentid = ?`, [data, id], (err, rows) => {
        callback(err, rows.affectedRows > 0 ? _.merge(data, { assessmentid: id }) : [])
      })
    })
  },
  deleteAssessment: (conn, id, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(connection)

      connection.query(`UPDATE assessment_tab SET status = 0, updated_at = now() WHERE assessmentid = ?`, [id], (err) => {
        callback(err, { message: 'data has been deleted' })
      })
    })
  },
  getDetailAssessment: (conn, assessmentId, limit, offset, keyword, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT at.title, ad.* FROM assessment_detail_tab ad JOIN assessment_tab at ON ad.assessmentid = at.assessmentid WHERE ad.status = 1 AND at.assessmentid = ${assessmentId} AND (question_type LIKE '%${keyword}%' OR question LIKE '%${keyword}%') ORDER BY ad.detailid DESC LIMIT ${offset}, ${limit}`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getQuestions: (conn, assessmentId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM assessment_detail_tab WHERE assessmentid = ${assessmentId} AND status=1`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getDetailAssessmentDetail: (conn, id, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM assessment_detail_tab WHERE detailid = ${id}`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  insertDetailAssessment: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`INSERT INTO assessment_detail_tab SET ?`, [data], (err, rows) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { id: rows.insertId }))
        }
      })
    })
  },
  updateDetailAssessment: (conn, id, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`UPDATE assessment_detail_tab SET ? WHERE detailid = ?`, [data, id], (err, rows) => {
        callback(err, rows.affectedRows > 0 ? _.merge(data, { detailid: id }) : [])
      })
    })
  },
  deleteDetailAssessment: (conn, id, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`UPDATE assessment_detail_tab SET status = 0, updated_at = now() WHERE detailid = ?`, [id], (err) => {
        callback(err)
      })
    })
  }
}
