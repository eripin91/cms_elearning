'use strict'

/*
 * GET : '/'
 *
 * @desc Get dashboard home
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */
exports.main = async (req, res) => {
  res.render('index')
}
