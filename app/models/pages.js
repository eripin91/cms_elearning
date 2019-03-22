'use strict'

module.exports = {
  get: (conn, limit, offset, keyword, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      let sql = ''

      if (!_.isEmpty(keyword)) {
        sql = ` AND (ptitle LIKE '%${keyword}%' OR pcontent LIKE '%${keyword}%')`
      }

      connection.query(`SELECT * FROM pages_tab WHERE status=1 ${sql} ORDER BY pageid DESC LIMIT ${offset},${limit}`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getTotalPages: (conn, keyword, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT COUNT(*) as total FROM pages_tab WHERE status=1 AND (ptitle LIKE '%${keyword}%' OR pcontent LIKE '%${keyword}%')`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getPagesDetail: (conn, id, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT * FROM pages_tab WHERE (status=1 OR status=0) AND pageid = ?', [id], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  insert: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('INSERT INTO pages_tab SET ? ', data, (err, rows) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { id: rows.insertId }))
        }
      })
    })
  },
  update: (conn, id, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('UPDATE pages_tab SET ? WHERE pageid = ? ', [data, id], (errUpdate, resultUpdate) => {
        callback(errUpdate, resultUpdate.affectedRows > 0 ? _.merge(data, { pageid: id }) : [])
      })
    })
  }
}
