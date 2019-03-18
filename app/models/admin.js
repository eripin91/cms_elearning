'use strict'

module.exports = {
  get: (conn, limit, offset, keyword, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT * FROM admin_tab WHERE (status=1 OR status=0) AND (email LIKE '%${keyword}%' OR nick LIKE '%${keyword}%') ORDER BY adminid DESC LIMIT ${offset},${limit}`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getTotalAdmin: (conn, keyword, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query(`SELECT COUNT(*) as total FROM admin_tab WHERE (status=1 OR status=0) AND (email LIKE '%${keyword}%' OR nick LIKE '%${keyword}%')`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getAdminDetail: (conn, id, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT * FROM admin_tab WHERE (status=1 OR status=0) AND adminid = ?', [id], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  checkEmail: (conn, email, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT * FROM admin_tab WHERE (status=1 OR status=0) AND email = ?', [email], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getAdminSelect: (conn, id, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT adminid as id,email as value FROM admin_tab WHERE (status=1 OR status=0)', (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getAdmin: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT a.*,b.name as gname FROM admin_tab a JOIN admin_groups_tab b ON a.groupid=b.groupid WHERE (a.status=1 OR a.status=0)', (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getAdminByEmail: (conn, email, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('SELECT * FROM admin_tab WHERE status=1 AND email = ?', [email], (err, rows) => {
        callback(err, _.result(rows, '[0]', {}))
      })
    })
  },
  insert: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('INSERT INTO admin_tab SET ? ', data, (err, rows) => {
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

      connection.query('UPDATE admin_tab SET ? WHERE adminid = ? ', [data, id], (errUpdate, resultUpdate) => {
        callback(errUpdate, resultUpdate.affectedRows > 0 ? _.merge(data, { adminid: id }) : [])
      })
    })
  }
}
