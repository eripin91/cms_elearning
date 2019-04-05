'use strict'

module.exports = {
  getUserMaterial: (conn, userId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.log(errConnection)
      connection.query('SELECT cm.materialId, cm.name, cm.thumbnails, cm.duration, um.is_done_watching FROM users_material_progress_tab um JOIN courses_material_tab cm ON um.materialid = cm.materialid JOIN users_tab u on u.userid = um.userid WHERE um.userid = ? AND um.is_downloaded = 1', userId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  checkUserMaterialAlreadyExist: (conn, userId, materialId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.log(errConnection)
      connection.query('SELECT * FROM users_material_progress_tab um WHERE userid = ? AND materialid = ?', [userId, materialId], (err, rows) => {
        callback(err, rows)
      })
    })
  },
  insertUserMaterial: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('INSERT INTO users_material_progress_tab SET ?', data, (err, rows) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { id: rows.insertId }))
        }
      })
    })
  },
  updateUserMaterial: (conn, id, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)
      connection.query('UPDATE users_material_progress_tab SET ? WHERE id = ?', [data, id], (errUpdate, resultUpdate) => {
        callback(errUpdate, resultUpdate.affectedRows > 0 ? _.merge(data, { id: id }) : [])
      })
    })
  }

}
