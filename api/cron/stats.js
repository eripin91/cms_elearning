'use strict'

require('dotenv').config()

global.CONFIG = require('../app/config')
const mysql = require('mysql')
const async = require('async')
const _ = require('lodash')

const connection = mysql.createConnection({
  host: CONFIG.DATABASE.HOST,
  user: CONFIG.DATABASE.USER,
  password: CONFIG.DATABASE.PASSWORD,
  database: CONFIG.DATABASE.DB
})

connection.connect()

const userStats = []

const countStats = (userId, callback) => {
  connection.query(`SELECT SUM(watchingduration) as totalDuration, COUNT(*) as totalMaterial, (SELECT COUNT(*) as totalModule FROM users_course_detail_tab WHERE userid=${userId} AND is_completed=1 AND is_done_watching=1) as totalModule, (SELECT COUNT(*) as totalAssessment FROM users_scores_tab WHERE userid=${userId} AND status=1) as totalAssessment FROM users_material_progress_tab WHERE userid=${userId} AND status=1`, (errMaterial, resultMaterial) => {
    userStats.push({ userId: userId, totalDuration: _.result(resultMaterial, '[0]totalDuration', 0) || 0, totalMaterial: _.result(resultMaterial, '[0]totalMaterial', 0), totalModule: _.result(resultMaterial, '[0]totalModule', 0), totalAssessment: _.result(resultMaterial, '[0]totalAssessment', 0) })
    callback()
  })
}

const updateUserStats = (userId, data, callback) => {
  connection.query('UPDATE users_stats_tab SET ? WHERE userid = ?', [data, userId], (errUpdate, resultUpdate) => {
    callback()
  })
}

async.waterfall([
  (cb) => {
    connection.query('SELECT userid FROM users_tab WHERE status=1 AND confirm=1', (errUser, results) => {
      if (errUser) throw errUser
      cb(errUser, results)
    })
  },
  (users, cb) => {
    async.eachSeries(users, (item, next) => {
      countStats(item.userid, next)
    }, err => {
      cb(err)
    })
  },
  (cb) => {
    async.eachSeries(userStats, (item, next) => {
      let dataStats = {
        total_video_duration: item.totalDuration,
        total_video_watch: item.totalMaterial,
        total_module: item.totalMaterial,
        total_assessment: item.totalAssessment
      }

      updateUserStats(item.userId, dataStats, next)
    }, err => {
      cb(err, userStats)
    })
  }
], (errStats, resultStats) => {
  console.log(resultStats)
  connection.end()
})
