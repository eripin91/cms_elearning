'use strict'

module.exports = {
  get: (conn, userId, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT c.* FROM courses_tab c LEFT JOIN classes_tab ct ON c.classid = ct.classid WHERE c.classid = ?', classId, (err, rows) => {
        let data = rows[0]
        if (err) console.log(err)

        if (data === undefined) {
          callback(err, data)
        } else {
          connection.query('SELECT cd.detailid, cd.name, SUM(cm.duration) as durasi, (SELECT b.is_completed FROM courses_detail_tab a LEFT JOIN users_course_detail_tab b ON a.detailid = b.detailid LEFT JOIN users_tab c ON b.userid = c.userid WHERE a.detailid = cd.detailid AND c.userid = ?) as is_completed FROM courses_detail_tab cd LEFT JOIN courses_material_tab cm ON cd.detailid = cm.detailid WHERE cd.courseid = ? GROUP BY(cd.detailid)', [userId, data.courseid], (err, result) => {
            data.course = result
            callback(err, data)
          })
        }
      })
    })
  },
  getDetail: (conn, courseId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT cd.detailid, cd.name, SUM(cm.duration) as durasi FROM courses_detail_tab cd JOIN courses_material_tab cm ON cd.detailid = cm.detailid WHERE cd.courseid = ? AND cd.status = 1 GROUP BY(cd.detailid)', courseId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getMaterial: (conn, userId, detailId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT cm.materialid, cd.detailid, cm.name, cm.thumbnails, cm.duration, (SELECT b.is_downloaded FROM courses_material_tab a LEFT JOIN users_material_progress_tab b ON a.materialid = b.materialid LEFT JOIN users_tab c ON b.userid = c.userid WHERE c.userid = ? AND b.materialid = cm.materialid) AS is_downloaded, (SELECT b.is_done_watching FROM courses_material_tab a LEFT JOIN users_material_progress_tab b ON a.materialid = b.materialid LEFT JOIN users_tab c ON b.userid = c.userid WHERE c.userid = ? AND b.materialid = cm.materialid) AS is_done_watching FROM courses_material_tab cm LEFT JOIN courses_detail_tab cd ON cm.detailid = cd.detailid LEFT JOIN courses_tab c ON cd.courseid = c.courseid WHERE cd.detailid = ? AND cd.status = 1', [userId, userId, detailId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getCheckCourseComplete: (conn, detailId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT COUNT(materialid) AS jumlah_materi FROM courses_material_tab WHERE detailid = ?', [detailId], (err, rows) => {
        if (err) console.error(err)
        let data = rows[0]
        connection.query('SELECT cd.name as nama, COUNT(um.id) AS user_materi, ct.name FROM users_material_progress_tab um LEFT JOIN courses_material_tab cm ON um.materialid = cm.materialid LEFT JOIN users_tab u ON um.userid = u.userid LEFT JOIN courses_detail_tab cd ON cm.detailid = cd.detailid LEFT JOIN courses_tab c ON c.courseid = cd.courseid LEFT JOIN classes_tab ct ON ct.classid = c.classid WHERE cd.detailid = ? AND um.is_done_watching = 1', detailId, (err, result) => {
          data.user_materi = result[0].user_materi
          data.name = result[0].nama
          data.class_name = result[0].name
          callback(err, data)
        })
      })
    })
  },

  getStatusDownload: (conn, userId, materialId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(connection)
      connection.query('SELECT um.is_downloaded FROM users_material_progress_tab um LEFT JOIN users_tab u ON um.userid = u.userid LEFT JOIN courses_material_tab cm ON um.materialid = cm.materialid WHERE um.userid = ? AND um.materialid = ?', [userId, materialId], (rows) => {
        callback(rows)
      })
    })
  },
  getMaterialDetail: (conn, materialId, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT cm.*, (SELECT is_done_watching FROM users_material_progress_tab WHERE userid = ? AND materialid = cm.materialid) AS is_done_watching FROM courses_material_tab cm WHERE cm.materialid = ? AND cm.status = 1', [userId, materialId], (err, rows) => {
        if (err) console.log(err)
        function sizeCount (size, length) {
          var trigger = 0
          while (size >= length) {
            trigger += 1
            size = size / length
          }
          return {
            size: size,
            trigger: trigger
          }
        }
        if (rows[0].is_done_watching === null) {
          rows[0].is_done_watching = 0
        }

        let size, descriptor
        size = sizeCount(rows[0].size, 1024)
        descriptor = ['Byte', 'KB', 'MB', 'GB']
        rows[0].size = Math.ceil(size.size) + ' ' + descriptor[size.trigger]
        let data = rows[0]
        connection.query('SELECT cm.materialid, cd.detailid, cm.name, cm.thumbnails, cm.duration FROM courses_material_tab cm JOIN courses_detail_tab cd ON cm.detailid = cd.detailid WHERE cm.detailid = ? AND cm.materialid > ? LIMIT 3', [data.detailid, data.materialid], (err, result) => {
          data.next = result
          callback(err, data)
        })
      })
    })
  },
  insertMaterialDetail: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.log(errConnection)
      connection.query('INSERT INTO users_course_detail_tab SET ?', data, (err, rows) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { id: rows.inserId }))
        }
      })
    })
  },
  getUserMaterial: (conn, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT cm.materialid, cm.name, cm.thumbnails, cm.duration, um.is_done_watching, um.is_downloaded FROM users_material_progress_tab um JOIN users_tab u ON um.userid = u.userid JOIN courses_material_tab cm ON cm.materialid = um.materialid where um.userid = ? AND um.is_downloaded = 1', userId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getNextMaterial: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT cm.materialid, cd.detailid, cm.name, cm.thumbnails, cm.duration FROM courses_material_tab cm JOIN courses_detail_tab cd ON cm.detailid = cd.detailid WHERE cm.detailid = ? AND cm.materialid > ? LIMIT 3', data, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  checkUserCourseDetail: (conn, userId, detailId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT * FROM users_course_detail_tab WHERE userid = ? AND detailid = ?', [userId, detailId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  checkUserMaterial: (conn, materialId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT um.*, cm.name as material_name FROM users_material_progress_tab um JOIN courses_material_tab cm ON um.materialid = cm.materialid WHERE um.materialid = ' + materialId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  insertUserMaterial: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('INSERT INTO users_material_progress_tab SET ?', data, (err, rows) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { id: rows.insertId }))
        }
      })
    })
  },
  updateUserMaterial: (conn, id, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('UPDATE users_material_progress_tab SET ? WHERE id = ?', [data, id], (err, rows) => {
        callback(err, rows.affectedRows > 0 ? _.merge(data, { id: id }) : [])
      })
    })
  },
  checkDetailMaterial: (conn, detailId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT * FROM users_course_detail_tab WHERE detailId = ?', detailId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  insertDetailMaterial: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('INSERT INTO users_course_detail_tab SET ?', data, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  updateDetailMaterial: (conn, id, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('UPDATE users_course_detail_tab SET ? WHERE id = ?', [data, id], (err, rows) => {
        callback(err, rows.affectedRows > 0 ? _.merge(data, { id: id }) : [])
      })
    })
  },
  checkUserClass: (conn, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT * FROM users_classes_tab WHERE classid = ?', classId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  checkUserClassProgress: (conn, classId, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT ct.name, a.courseid, (SELECT COUNT(cd.detailid) FROM courses_tab c JOIN courses_detail_tab cd ON c.courseid = cd.courseid WHERE c.courseid=a.courseid) AS jumlah_total FROM classes_tab ct LEFT JOIN courses_tab a on ct.classid = a.classid WHERE a.classid = ?', classId, (err, result) => {
        if (err) console.log(err)
        let data = result[0]
        connection.query('SELECT COUNT(id) as user_progress FROM users_course_detail_tab ud left JOIN courses_detail_tab cd ON cd.detailid = ud.detailid LEFT JOIN users_tab u ON u.userid = ud.userid WHERE cd.courseid = 1 AND u.userid = 1 ', [result[0].courseid, userId], (err, rows) => {
          data.user_progress = rows[0].user_progress
          callback(err, data)
        })
      })
    })
  },
  checkerClassDone: (conn, classId, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT uc.*, ct.name FROM users_classes_tab uc LEFT JOIN classes_tab ct ON uc.classid = ct.classid WHERE uc.userid = ? AND uc.classid = ?', [userId, classId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getTestCourseDetail: (conn, assessmentId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(connection)
      connection.query(`SELECT COUNT(IF(question_type = 'single-choice', 1, null)) AS single_choice, COUNT(IF(question_type = 'essay', 1, null)) AS essay FROM assessment_detail_tab WHERE assessmentid = ?`, [assessmentId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  checkTestCourseDone: (conn, assessmentId, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      connection.query(`SELECT * FROM users_assessment_tab ua LEFT JOIN assessment_detail_tab ad ON ua.detailassessmentid = ad.detailid WHERE ua.userid = ? AND ad.assessmentid = ?`, [userId, assessmentId], (err, rows) => {
        if (errConnection) console.error(errConnection)
        callback(err, rows)
      })
    })
  }

}
