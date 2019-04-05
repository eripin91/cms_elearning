'use strict'

module.exports = {
  get: (conn, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM notification_tab WHERE userId = ?`, [userId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  insert: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`INSERT INTO notification_tab SET ?`, data, (err, rows) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { notificationid: rows.insertId }))
        }
      })
    })
  },
  checkerNotification: (conn, message, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT * FROM notification_tab WHERE message = ?', message, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getNotification: (conn, userId, limit, offset, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      let paginagionRole = ``

      if (limit > 0) {
        paginagionRole = `LIMIT ${offset},${limit}`
      }

      connection.query(`SELECT * FROM notification_tab WHERE userid = ? ORDER BY created_at DESC ${paginagionRole}`, userId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  countNotification: (conn, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT COUNT(*) as total FROM notification_tab WHERE userid = ?`, userId, (err, rows) => {
        callback(err, rows)
      })
    })
  }
}
