'use strict'

module.exports = {
  get: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      let sqlQuery = ''
      let condition = ''
      if (errConnection) console.error(errConnection)
      if (data[1] != null) {
        sqlQuery = 'c.*, SUM(cm.duration) as duration'
        condition = 'GROUP BY c.courseid, c.name, c.status'
      }
      if (data[2] != null) {
        sqlQuery = 'cd.*, cm.thumbnails, cm.duration'
        condition = 'AND c.courseid = ?'
      }
      if (data[3] != null) {
        sqlQuery = 'cm.*'
        condition = 'AND c.courseid = ? AND cd.detailid = ?'
      }
      connection.query('SELECT ' + sqlQuery + ' FROM users_material_progress_tab um LEFT JOIN users_tab u ON um.userid = u.userid LEFT JOIN courses_material_tab cm ON um.materialid = cm.materialid LEFT JOIN courses_detail_tab cd ON cm.detailid = cd.detailid LEFT JOIN courses_tab c ON cd.courseid = c.courseid LEFT JOIN classes_tab ct ON c.classid = ct.classid WHERE u.userid = ? AND c.classid = ? ' + condition + '', data, (err, rows) => {
        console.log(rows)
        callback(err, rows)
      })
    })
  },
  update: (conn, id, data, callback) => {
    console.log(id, data)
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query('UPDATE users_material_progress_tab SET ? WHERE id = ?', [data, id], (errUpdate, resultUpdate) => {
        callback(errUpdate, resultUpdate.affectedRows > 0 ? _.merge(data, { id: id }) : [])
      })
    })
  }
}
