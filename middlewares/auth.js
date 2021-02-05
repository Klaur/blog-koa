const jwt = require('koa-jwt')
const { secret } = require('../configs/secret')
const auth = jwt({ secret })
module.exports = auth
