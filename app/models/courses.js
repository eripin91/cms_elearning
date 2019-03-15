'use strict'

module.exports = {
  getCourse: (conn, limit, offset, keyword, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(connection)

      connection.query(`SELECT * FROM courses_tab WHERE status = 1 AND name LIKE '%${keyword}%' ORDER BY courseid DESC LIMIT ${offset}, ${limit}`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getTotalCourse: (conn, keyword, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(connection)
      connection.query(`SELECT COUNT(*) AS total FROM courses_tab WHERE status = 1 AND name LIKE '%${keyword}%'`, (err, rows) => {
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
  updateCourse: (conn, data, id, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('UPDATE courses_tab SET ? WHERE courseid = ?', [data, id], (err, rows) => {
        console.log(rows)
        callback(err, rows.affectedRows > 0 ? _.merge(data, { courseid: id }) : [])
      })
    })
  },
  deleteCourse: (conn, id, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('UPDATE courses_tab SET status = 0, updated_at = now() WHERE courseid = ?', [id], (err) => {
        callback(err, { message: 'Course has been deleted' })
      })
    })
  },
  getDetail: (conn, courseId, limit, offset, keyword, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT cd.detailid, cd.name, at.title AS assessment_title FROM courses_detail_tab cd JOIN courses_tab c ON cd.courseid = c.courseid LEFT JOIN assessment_tab at ON at.assessmentid = cd.assesmentid WHERE c.courseid = ${courseId} AND cd.name LIKE '%${keyword}%' AND cd.status = 1 ORDER BY cd.detailid DESC LIMIT ${offset}, ${limit}`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getDetailCourses: (conn, courseId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT cd.detailid, cd.name, at.title AS assessment_title FROM courses_detail_tab cd JOIN courses_tab c ON cd.courseid = c.courseid LEFT JOIN assessment_tab at ON at.assessmentid = cd.assesmentid WHERE cd.courseid = ${courseId} and cd.status = 1`, (err, rows) => {
        console.log(courseId)

        callback(err, rows)
      })
    })
  },
  getTotalDetail: (conn, courseId, keyword, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT COUNT(*) AS total FROM courses_detail_tab cd JOIN courses_tab c ON cd.courseid = c.courseid LEFT JOIN assessment_tab at ON at.assessmentid = cd.assesmentid WHERE c.courseid = ${courseId} AND cd.name LIKE '%${keyword}%' AND cd.status = 1`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getDetails: (conn, detailId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM courses_detail_tab WHERE detailid = ${detailId}`, (err, rows) => {
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
  updateDetail: (conn, data, id, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('UPDATE courses_detail_tab SET ? WHERE detailid = ?', [data, id], (errUpdate, resultUpdate) => {
        callback(errUpdate, resultUpdate.affectedRows > 0 ? _.merge(data, { detailid: id }) : [])
      })
    })
  },
  deleteDetail: (conn, id, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('UPDATE courses_detail_tab SET ? WHERE detailid = ?', [id], (errUpdate) => {
        callback(errUpdate, { message: 'Bab has been deleted' })
      })
    })
  },
  deleteAllDetail: (conn, courseId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`UPDATE courses_detail_tab SET status = 0, updated_at = NOW() WHERE courseid = ${courseId}`, (err) => {
        callback(err, { message: 'Course and bab has been deleted' })
      })
    })
  },
  checkCourse: (conn, courseId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('SELECT * FROM courses_tab WHERE courseId = ? AND status = 1', [courseId], (errCourse, resultCourse) => {
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
  getMaterialList: (conn, detailId, limit, offset, keyword, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM courses_material_tab WHERE detailid = ${detailId} AND name LIKE '%${keyword}%' AND status = 1 ORDER BY materialid DESC LIMIT ${offset}, ${limit}`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getMaterialCourses: (conn, detailId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM courses_material_tab WHERE detailid = ${detailId}`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getTotalMaterial: (conn, detailId, keyword, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT COUNT(*) AS total FROM courses_material_tab WHERE detailid = ${detailId} AND name LIKE '%${keyword}%' AND status = 1`, (err, rows) => {
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
  updateMaterial: (conn, data, id, callback) => {
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
        callback(err, { message: 'material has been deleted' })
      })
    })
  },
  deleteAllMaterial: (conn, detailId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`UPDATE courses_material_tab SET status = 0, updated_at = NOW() WHERE detailid = ${detailId}`, (errConnection) => {
        callback(errConnection, { message: 'Material has been deleted' })
      })
    })
  }

}
