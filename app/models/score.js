'use strict'

module.exports = {
  getUserScore: (conn, classId, limit, offset, keyword, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT ut.fullname, us.score FROM users_scores_tab us JOIN users_tab ut on us.userid = ut.userid WHERE us.type = 'class' AND us.parentid = ${classId} ORDER BY us.score DESC LIMIT ${offset}, ${limit}`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getUserTotalScore: (conn, classId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error('course not found')

      connection.query(`SELECT COUNT(*) AS score_count, (SELECT SUM(score) FROM users_scores_tab WHERE type = 'class' AND parentid = ${classId}) AS total_score FROM users_scores_tab WHERE type = 'class' AND parentid = ${classId}`, (err, rows) => {
        if (err) err = 0
        callback(null, rows)
      })
    })
  }
}
