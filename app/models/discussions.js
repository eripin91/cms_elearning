'use strict'

module.exports = {
  get: (conn, limit, offset, keyword, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT a.discussionid, a.userid, a.courseid, c.fullname, b.name AS course, a.post_content, a.created_at, a.updated_at FROM discussion_tab a JOIN courses_tab b ON a.courseid=b.courseid JOIN users_tab c ON a.userid = c.userid WHERE a.status = 1 AND a.parent = 0 AND (b.name LIKE '%${keyword}%' OR c.fullname LIKE '%${keyword}%' OR a.post_content LIKE '%${keyword}%') ORDER BY a.discussionid DESC LIMIT ${offset},${limit}`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getTotalThread: (conn, keyword, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT COUNT(*) AS total FROM discussion_tab a JOIN courses_tab b ON a.courseid=b.courseid JOIN users_tab c ON a.userid = c.userid WHERE a.status = 1 AND a.parent = 0 AND (b.name LIKE '%${keyword}%' OR c.fullname LIKE '%${keyword}%' OR a.post_content LIKE '%${keyword}%')`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getThreadCourse: (conn, courseId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT a.discussionid, a.userid, a.courseid, c.fullname, b.name AS course, a.post_content, a.created_at, a.updated_at FROM discussion_tab a JOIN courses_tab b ON a.courseid=b.courseid JOIN users_tab c ON a.userid = c.userid WHERE a.status = 1 AND a.parent = 0 AND a.courseid = ?`, courseId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getTotalThreadCourse: (conn, courseId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT COUNT(*) AS discussion FROM discussion_tab a JOIN courses_tab b ON a.courseid=b.courseid JOIN users_tab c ON a.userid = c.userid WHERE a.status = 1 AND a.parent = 0 AND a.courseid = ?`, courseId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  checkTotalReply: (conn, discussionId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT COUNT(discussionid) AS total_replied FROM discussion_tab WHERE parent=? AND status = 1 ORDER BY parent`, discussionId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getQuestion: (conn, discussionId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT a.discussionid, a.userid, a.courseid, c.fullname, b.name AS course, a.post_content, a.created_at, a.updated_at FROM discussion_tab a JOIN courses_tab b ON a.courseid=b.courseid JOIN users_tab c ON a.userid = c.userid WHERE a.status = 1 AND a.parent = 0 AND a.discussionid = ?`, discussionId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getReply: (conn, parentId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT a.discussionid, a.userid, a.courseid, c.fullname, b.name AS course, a.post_content, a.created_at, a.updated_at FROM discussion_tab a JOIN courses_tab b ON a.courseid=b.courseid JOIN users_tab c ON a.userid = c.userid WHERE a.status = 1 AND a.parent = ?`, parentId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  checkTread: (conn, discussionId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM discussion_tab WHERE discussionid = ? AND status = 1 LIMIT 1`, discussionId, (err, rows) => {
        callback(err, rows[0])
      })
    })
  },
  deleteThread: (conn, discussionId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`UPDATE discussion_tab SET status = 0, updated_at = NOW() WHERE discussionid = ?`, discussionId, (err) => {
        callback(err, { message: 'Thread has been deleted' })
      })
    })
  },
  deleteAnswer: (conn, parentId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`UPDATE discussion_tab SET status = 0, updated_at = NOW() WHERE parent = ?`, parentId, (err) => {
        callback(err, { message: 'Data Thread and reply has been deleted' })
      })
    })
  }

}
