'use strict'

const mailgun = require('mailgun-js')({ apiKey: CONFIG.MAILGUN.API_KEY, domain: CONFIG.MAILGUN.DOMAIN })
const MailComposer = require('nodemailer/lib/mail-composer')
const async = require('async')
const EmailTemplates = require('email-templates')
const templatesDir = `${CONFIG.ROOT}/app/email`

const mail = {
  sendEmail: (data, callback) => {
    if (_.result(data, 'tpl')) {
      const email = new EmailTemplates()
      async.waterfall([
        (cb) => {
          email
            .render(`${templatesDir}/${data.tpl}.ejs`, data)
            .then(tpl => {
              cb(null, tpl)
            })
            .catch(err => cb(err))
        },
        (tpl, cb) => {
          const mailOptions = _.merge(data, { text: tpl, html: tpl })
          const mail = new MailComposer(mailOptions)
          mail.compile().build((err, message) => {
            if (err) console.error(err)
            const dataToSend = {
              to: data.to,
              message: message.toString('ascii')
            }

            mailgun.messages().sendMime(dataToSend, (error, body) => {
              callback(error, body)
            })
          })
        }
      ], (err, template) => {
        callback(err, template)
      })
    } else {
      mailgun.messages().send(data, (error, body) => {
        callback(error, body)
      })
    }
  }
}

module.exports = mail
