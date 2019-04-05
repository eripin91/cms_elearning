/* global UsersControllers UploadControllers AuthHelper */

'use strict'

var Route = express.Router()

Route
  .all('/*', AuthHelper.requiresAuthorization)
  .get('/get', UsersControllers.get)
  .get('/get/:userId', UsersControllers.getDetail)
  .get('/:userId/classes', AuthHelper.requiresAccessToken, UsersControllers.getUserClass)
  .post('/login', UsersControllers.login)
  .get('/request-token', UsersControllers.requestToken)
  .get('/logout', UsersControllers.logout)
  .post('/register', UsersControllers.register)
  .post('/profile', UsersControllers.profile)
  .post('/confirm', UsersControllers.confirm)
  .post('/resend-verify', UsersControllers.resendVerify)
  .post('/change-password', UsersControllers.changePassword)
  .post('/forgot-password', UsersControllers.forgotPassword)
  .post('/set-password-forgot', UsersControllers.setPasswordForgot)
  .post('/upload', UploadControllers.upload.single('photo'), UsersControllers.upload)

module.exports = Route
