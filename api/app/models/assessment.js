'use strict'

module.exports = {
  getAssessmentDetail: (conn, assessmentid, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT * FROM assessment_tab WHERE assessmentid = ?`, [assessmentid], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getQuestions: (conn, assessmentid, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT * FROM assessment_detail_tab WHERE assessmentid = ?`, [assessmentid], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getQuestionsDetail: (conn, assessmentid, qNo, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      const questioNo = parseInt(qNo) < 0 ? 1 : parseInt(qNo)

      connection.query(`SELECT a.detailid,a.assessmentid,a.question_type,a.question,a.options FROM assessment_detail_tab a WHERE a.assessmentid = ? ORDER BY a.detailid ASC LIMIT ${questioNo - 1},1`, [assessmentid], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getQuestionsByDetailId: (conn, detailId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT a.detailid,a.answer,a.question_type FROM assessment_detail_tab a JOIN assessment_tab b ON a.assessmentid=b.assessmentid WHERE a.detailid = ?`, [detailId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getUserAnswer: (conn, detailAssessmentId, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT answer FROM users_assessment_tab WHERE detailassessmentid = ? AND userid = ? AND status = 1 LIMIT 1`, [detailAssessmentId, userId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getQuestionsNumber: (conn, assessmentId, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT a.detailid,b.answer FROM assessment_detail_tab a LEFT JOIN users_assessment_tab b ON a.assessmentid = b.detailassessmentid WHERE a.assessmentid = ? AND b.userid = ? ORDER BY a.detailid ASC`, [assessmentId, userId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  checkUserAlreadyAnswer: (conn, userId, detailAssessmentId, parentId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT * FROM users_assessment_tab WHERE userid = ? AND detailassessmentid = ? AND parentid = ? LIMIT 1`, [userId, detailAssessmentId, parentId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getTotalQuestion: (conn, assessmentId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT COUNT(*) as total, question_type FROM assessment_detail_tab WHERE assessmentid = ? GROUP BY question_type`, [assessmentId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getAssessmentResult: (conn, userId, parentId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT * FROM users_assessment_tab WHERE userid = ? AND parentid = ?`, [userId, parentId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  insertUserAnswer: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('INSERT INTO users_assessment_tab SET ? ', data, (err, rows) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { id: rows.insertId }))
        }
      })
    })
  },
  updateUserAnswer: (conn, id, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('UPDATE users_assessment_tab SET ? WHERE id = ?', [data, id], (errUpdate, resultUpdate) => {
        callback(errUpdate, resultUpdate.affectedRows > 0 ? _.merge(data, { userid: id }) : [])
      })
    })
  }
}
