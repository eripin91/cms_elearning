'use strict'

module.exports = {
  getCourse: (conn, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(connection)

      connection.query('SELECT * FROM courses_tab WHERE classId = ? AND status = 1', [classId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getCourseDetail: (conn, id, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('SELECT * FROM courses_tab WHERE courseid = ? AND status = 1', [id], (err, result) => {
        callback(err, result)
      })
    })
  },
  insertCourse: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('INSERT INTO courses_tab SET ?', [data], (err, result) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { id: result.insertId }))
        }
      })
    })
  },
  updateCourse: (conn, id, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('UPDATE courses_material SET ? WHERE courseid = ?', [data, id], (err, result) => {
        callback(err, result.affectedRows > 0 ? _.merge(data, { courseid: id }) : [])
      })
    })
  },
  deleteCourse: (conn, id, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('UPDATE courses_material SET ? WHERE courseid = ?', [data, id], (err, result) => {
        callback(err, result.affectedRows > 0 ? _.merge(data, { courseid: id }) : [])
      })
    })
  },
  getDetail: (conn, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('SELECT cd.name, at.title AS assessment_title FROM courses_detail_tab cd JOIN courses_tab c ON cd.courseid = c.courseid LEFT JOIN assessment_tab at ON at.assessmentid = cd.assesmentid WHERE c.classid = ? AND cd.status = 1', classId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  insertDetail: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('INSERT INTO courses_detail_tab SET ? ', data, (err, rows) => {
        if (err) {
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
      if (errConnection) console.error(errConnection)

      connection.query('SELECT * FROM courses_tab WHERE classid = ? AND status = 1', [classId], (errCourse, resultCourse) => {
        callback(errCourse, resultCourse)
      })
    })
  },
  checkDetail: (conn, detailId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('SELECT * FROM courses_detail_tab WHERE detailid = ? AND status = 1', [detailId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getMaterialList: (conn, detailId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('SELECT * FROM courses_material_tab WHERE detailid = ? AND status = 1', [detailId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getMaterialDetail: (conn, materialid, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('SELECT * FROM courses_material_tab WHERE materialid = ? AND status = 1', [materialid], (err, result) => {
        callback(err, result)
      })
    })
  },
  insertMaterial: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('INSERT INTO courses_material_tab SET ? ', [data], (err, rows) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { id: rows.insertId }))
        }
      })
    })
  },
  updateMaterial: (conn, id, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('UPDATE courses_material_tab SET ? WHERE materialid = ?', [data, id], (err, rows) => {
        callback(err, rows.affectedRows > 0 ? _.merge(data, { materialid: id }) : [])
      })
    })
  },
  deleteMaterial: (conn, id, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('UPDATE courses_material_tab SET ? WHERE materialid = ?', [data, id], (err, rows) => {
        callback(err, rows.affectedRows > 0 ? _.merge(data, { materialid: id }) : [])
      })
    })
  }

}
