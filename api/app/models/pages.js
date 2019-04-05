'use strict'

module.exports = {
  get: (conn, slug, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT * FROM pages_tab WHERE slug = ?`, [slug], (err, rows) => {
        callback(err, rows)
      })
    })
  }
}
