'use strict'

const errorHandler = require('./error-handler')

module.exports = function(req, res, next) {
  let authHeaders = req.headers.authorization
  if(!authHeaders)
    return errorHandler(new Error('Authorization Failed. Headers do not meet requirements.'), res)

  let base64 = authHeaders.split('Basic ')[1]
  if(!base64)
    return errorHandler(new Error('Authorization Failed. Authorization Headers not set.'), res)

  let [username, password] = Buffer.from(base64, 'base64').toString().split(':')
  req.auth = {username, password}

  if(!req.auth.username)
    return errorHandler(new Error('Authorization Failed. Username Required.'), res)
  if(!req.auth.password)
    return errorHandler(new Error('Authorization Failed. Password Required.'), res)

  next()
}