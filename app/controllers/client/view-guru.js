'use strict'

const ApiLibs = require('../../libs/API')
const async = require('async')
const moment = require('moment')

const API_SERVICE = ApiLibs.client({
  baseUrl: CONFIG.SERVER.BASE_WEBHOST,
  headers: CONFIG.REQUEST_HEADERS
})

/*
*   GET : '/'
*
*   @desc Get Discussion
*/
exports.main = async (req, res) => {
  const errorMsg = await MiscHelper.get_error_msg(req.sessionId)
  res.render('guru', { errorMsg: errorMsg })
}

/*
* GET : '/ajax/get'
*
* @desc Ajax get thread list
*
* @param {object} req - Parameters for request
*
* @return {object} Request object
*
*/

exports.ajaxGet = async (req, res) => {
  API_SERVICE.get('v1/guru/get', { limit: _.result(req.query, 'length', 25), offset: _.result(req.query, 'start', 0), keyword: req.query.search['value'] }, (err, response) => {
    if (!err) {
      const dataGuru = []
      async.eachSeries(_.result(response, 'data', []), (item, next) => {
        item.action = MiscHelper.getActionButtonFull('guru', item.guruid)
        item.created_at = moment(item.created_at).format('DD/MM/YYYY hh:mm')
        item.profile_picture = MiscHelper.getPhoto(item.profile_picture)
        dataGuru.push(item)
        next()
      }, err => {
        if (!err) {
          const data = {
            draw: _.result(req.query, 'draw', 1),
            recordsTotal: _.result(response, 'total', 0),
            recordsFiltered: _.result(response, 'total', 0)
          }

          return MiscHelper.responses(res, dataGuru, 200, data)
        } else {
          return MiscHelper.errorCustomStatus(res, err, 400)
        }
      })
    } else {
      return MiscHelper.errorCustomStatus(res, err, _.result(err, 'status', 400))
    }
  })
}

exports.delete = async (req, res) => {
  const guruId = req.params.guruId
  console.log(guruId)
  if (!guruId) {
    MiscHelper.set_error_msg({ error: 'Guru ID required !!!' }, req.sessionID)
    res.redirect('/guru')
  } else {
    API_SERVICE.get('v1/guru/delete/' + guruId, {}, (err, response) => {
      if (err) {
        MiscHelper.set_error_msg({ error: err.message }, req.sessionID)
      } else {
        MiscHelper.set_error_msg({ info: 'Guru berhasil dihapus.' }, req.sessionID)
        res.redirect('/guru')
      }
    })
  }
}

/*
 * GET && POST : '/update'
 *
 * @desc Update admin
 *
 * @param  {object} req - for request
 * @param  {object} req.body.adminId - adminId for identifier
 *
 * @return {object} Request object
 */
exports.update = async (req, res) => {
  if (_.isEmpty(req.body)) {
    const errorMsg = await MiscHelper.get_error_msg(req.sessionID)
    API_SERVICE.get(
      'v1/guru/get/' + req.params.guruId,
      {},
      (err, response) => {
        if (err) console.error(err)
        res.render('guru_update', { errorMsg: errorMsg, data: response.data })

        console.log(response.data)
      }
    )
  } else {
    const guruId = req.body.guruId
    const fullname = req.body.fullname
    const description = req.body.description

    console.log(req.body)

    if (!guruId) {
      MiscHelper.set_error_msg(
        { error: 'Kesalahan input data !!!' },
        req.sessionID
      )
      res.redirect('/guru')
    } else {
      if (!fullname && !description) {
        MiscHelper.set_error_msg(
          { error: 'Fullname & Description wajib di isi !!!' },
          req.sessionID
        )
        res.redirect('/guru/update/' + guruId)
      } else {
        API_SERVICE.patch(
          'v1/guru/update/' + guruId,
          req.body,
          (err, response) => {
            if (!err) {
              MiscHelper.set_error_msg(
                { info: 'Guru berhasil diubah.' },
                req.sessionID
              )
              res.redirect('/guru')
            } else {
              MiscHelper.set_error_msg({ error: err.message }, req.sessionID)
              res.redirect('/guru/update/' + guruId)
            }
          }
        )
      }
    }
  }
}
