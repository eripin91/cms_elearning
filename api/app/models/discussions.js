'use strict'

module.exports = {
  getThread: (conn, courseId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT a.discussionid, b.fullname AS threadstarter, a.post_content AS question, a.created_at, a.updated_at FROM discussion_tab a LEFT JOIN users_tab b ON a.userid=b.userid WHERE a.parent = 0 AND a.courseid = ? ORDER BY a.created_at DESC`, courseId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getThreadDetail: (conn, disscussionId, userId, sortBy, orderBy, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('SELECT a.discussionid, b.fullname AS thread_starter, a.post_content, a.created_at, a.updated_at FROM discussion_tab a LEFT JOIN users_tab b ON a.userid = b.userid WHERE a.discussionid = ? AND a.parent=0', disscussionId, (err, rows) => {
        let data = rows[0]
        if (err) console.log(err)

        connection.query(`SELECT a.discussionid, a.parent, a.post_content, b.fullname, (SELECT COUNT(id) FROM discussion_likes_tab WHERE discussionid=a.discussionid AND status=1 GROUP BY discussionid) AS total_like, a.created_at as time, a.updated_at, (SELECT EXISTS(SELECT * FROM discussion_likes_tab WHERE userid=? AND discussionid=a.discussionid AND status=1)) AS is_like FROM discussion_tab a LEFT JOIN users_tab b ON a.userid=b.userid WHERE a.parent = ? ORDER BY ${sortBy} ${orderBy}`, [userId, data.discussionid], (err, result) => {
          data.reply = result
          callback(err, data)
        })
      })
    })
  },
  checkUserLike: (conn, userId, discussionId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT EXISTS(SELECT * FROM discussion_likes_tab WHERE userid=? AND discussionid=? AND status=1) AS is_like`, [userId, discussionId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  checkTotalReply: (conn, discussionId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT COUNT(discussionid) AS total_replied FROM discussion_tab WHERE parent=? ORDER BY parent`, discussionId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  checkTotalLike: (conn, discussionId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT COUNT(id) AS total_like FROM discussion_likes_tab WHERE discussionid=? AND status=1 ORDER BY discussionid`, discussionId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  checkQuestion: (conn, discussionId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM discussion_tab WHERE parent=0 AND discussionid=? LIMIT 1`, discussionId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  insertThreadTitle: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`INSERT INTO discussion_tab SET ?`, data, (err, rows) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { disscussionid: rows.insertId }))
        }
      })
    })
  },
  insertThreadContent: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`INSERT INTO discussion_tab SET ?`, data, (err, rows) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { disscussionid: rows.insertId }))
        }
      })
    })
  },
  checkThread: (conn, discussionId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM discussion_tab WHERE discussionid = ? LIMIT 1`, discussionId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  checkLike: (conn, disscussionId, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM discussion_likes_tab WHERE discussionid = ? AND userid = ? LIMIT 1`, [disscussionId, userId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  insertLike: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`INSERT INTO discussion_likes_tab SET ?`, data, (err, rows) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { id: rows.insertId }))
        }
      })
    })
  },
  updateLike: (conn, id, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`UPDATE discussion_likes_tab SET ? WHERE id = ?`, [data, id], (errUpdate, resultUpdate) => {
        callback(errUpdate, resultUpdate.affectedRows > 0 ? _.merge(data, { id: id }) : [])
      })
    })
  }
}
