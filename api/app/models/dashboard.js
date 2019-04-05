'use strict'

module.exports = {
  getUserClass: (conn, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT * FROM users_classes_tab WHERE userid = ?`, [userId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getUserClassLimit: (conn, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT ct.classid, ct.name AS class_name, ct.cover, gt.fullname as guru, (SELECT COUNT(*) FROM users_classes_tab WHERE classid = ct.classid) AS member FROM users_classes_tab uc LEFT JOIN classes_tab ct ON uc.classid = ct.classid LEFT JOIN guru_tab gt ON ct.guruid = gt.guruid  WHERE userid = ? LIMIT 5`, [userId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getUserClassProgress: (conn, userId, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT (SELECT COUNT(*) FROM courses_detail_tab WHERE courseid = c.courseid) AS all_bab, (SELECT COUNT(*) FROM users_course_detail_tab uc LEFT JOIN courses_detail_tab cd ON cd.detailid = uc.detailid WHERE uc.userid = ? AND cd.courseid = c.courseid) as progress_bab FROM classes_tab ct LEFT JOIN courses_tab c ON ct.classid = c.classId WHERE ct.classid = ?`, [userId, classId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getClass: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(connection)
      connection.query(`SELECT * FROM classes_tab ORDER BY classid ASC`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getClassLimit: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT ct.classid, ct.name, ct.cover, gt.fullname AS guru FROM classes_tab ct LEFT JOIN guru_tab gt ON ct.guruid = gt.guruid ORDER BY classid ASC LIMIT 5`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getClassRecomendation: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT * FROM classes_tab ORDER BY priority DESC`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getClassRecomendationLimit: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT ct.classid, ct.name, gt.fullname AS guru, ct.cover, (SELECT COUNT(*) FROM users_classes_tab WHERE classid = ct.classid) as member FROM classes_tab ct LEFT JOIN guru_tab gt ON ct.guruid = gt.guruid ORDER BY ct.priority DESC LIMIT 5`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getDetailCount: (conn, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT (SELECT COUNT(*) FROM courses_detail_tab WHERE courseid = c.courseid) AS total_bab FROM classes_tab ct LEFT JOIN courses_tab c ON ct.classid = c.classid WHERE ct.classid = ?`, [classId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getDurationCount: (conn, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT (SELECT SUM(cm.duration) FROM courses_detail_tab cd LEFT JOIN courses_material_tab cm ON cd.detailid = cm.detailid WHERE cd.courseid = c.courseid) AS total_durasi FROM classes_tab ct LEFT JOIN courses_tab c ON ct.classid = c.classid WHERE ct.classid = ?`, [classId], (err, rows) => {
        callback(err, rows)
      })
    })
  }
}
