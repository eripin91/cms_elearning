'use strict'

module.exports = {
  get: (conn, limit, offset, keyword, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM guru_tab WHERE status = 1 AND (fullname LIKE '%${keyword}%' OR description LIKE '%${keyword}%') ORDER BY guruid DESC LIMIT ${offset}, ${limit}`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getTotalGuru: (conn, keyword, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT COUNT(*) as total FROM guru_tab WHERE status=1 AND (fullname LIKE '%${keyword}%' OR description LIKE '%${keyword}%')`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  insertGuru: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`INSERT INTO guru_tab SET ? `, data, (err, rows) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { guruid: rows.insertId }))
        }
      })
    })
  },
  checkGuru: (conn, guruName, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM guru_tab WHERE status = 1 AND fullname = ?`, guruName, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  checkDetailGuru: (conn, guruId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(connection)

      connection.query(`SELECT * FROM guru_tab WHERE status = 1 AND guruid = ?`, guruId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  updateGuru: (conn, data, guruId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`UPDATE guru_tab SET ? WHERE guruid = ?`, [data, guruId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  deleteGuru: (conn, guruId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`UPDATE guru_tab SET status = 0, updated_at = NOW() WHERE guruid = ?`, guruId, (err) => {
        callback(err, { message: 'Data deleted' })
      })
    })
  }
}
