'use strict'

module.exports = {
  getDetail: (conn, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('SELECT cd.name, at.title AS assessment_title FROM courses_detail_tab cd JOIN courses_tab c ON cd.courseid = c.courseid LEFT JOIN assessment_tab at ON at.assessmentid = cd.assesmentid WHERE c.classid = ?', classId, (err, rows) => {
        callback(er, rows)
      })
    })
  },
  insertDetail: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('INSERT INTO courses_detail_tab SET ? ', data, (err, rows) => {
        if(err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { id: rows.insertId }))
        }
      })
    })
  },
  updateDetail: (conn, id, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('UPDATE courses_detail_tab SET ? WHERE detailid = ?', [data, id], (errUpdate, resultUpdate) => {
        callback(errUpdate, resultUpdate.affectedRows > 0 ? _.merge(data, { detailid: id }) : [])
      })
    })
  },
  deleteDetail: (conn, id, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('UPDATE courses_detail_tab SET ? WHERE detailid = ?', [data, id], (errUpdate, resultUpdate) => {
        callback(errUpdate, resultUpdate.affectedRows > 0 ? _.merge(data, { detailid: id }) : [])
      }) 
    })
  },
  checkCourse: (conn, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if(errConnection) console.error(errConnection)

      connection.query('SELECT * FROM courses_tab WHERE classid = ?', [classId], (errCourse, resultCourse) => {
        callback(errCourse, resultCourse)
      })
    })
  },
  checkDetail: (conn, detailId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('SELECT * FROM courses_detail_tab WHERE detailid = ?', [detailId], (err, rows) => {
        callback(err, rows)
      })
    })
  }
}