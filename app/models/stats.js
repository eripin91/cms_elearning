'use strict'

module.exports = {
  getUserStatistic: (conn, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT * FROM users_stats_tab WHERE userid = ?`, [userId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getUserCertificate: (conn, userId, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT b.fullname AS username, c.name AS classname FROM users_classes_tab a JOIN users_tab b ON a.userid=b.userid JOIN classes_tab c ON a.classid=c.classid WHERE a.userid=? AND a.classid=? AND a.is_completed=1 AND a.status=1`, [userId, classId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getCertificate: (conn, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT a.id, a.classid, a.userid, a.finished_at FROM users_classes_tab a WHERE userid=? AND is_completed=1 AND status=1`, userId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  checkClass: (conn, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(connection)

      connection.query(`SELECT name FROM classes_tab WHERE classid=?`, classId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getUserAchievementClass: (conn, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT userid, parentid AS classid FROM users_scores_tab WHERE type = 'class' AND userid = ?`, [userId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getUserAchievementScore: (conn, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT us.userid, ct.name, us.score, us.created_at FROM users_scores_tab us JOIN classes_tab ct ON us.parentid = ct.classid WHERE type = 'class' AND parentid = ? ORDER BY score DESC`, [classId], (err, rows) => {
        callback(err, rows)
      })
    })
  }
}
