const jwt = require('jsonwebtoken')
const { secret } = require('../configs/secret')
const User = require('../models/user')
const message = require('../utils/message')
module.exports = {
  async check(ctx, next) {
    ctx.body = message({
      username: ctx.state.user.username
    })
  },
  async login(ctx, next) {
    ctx.verifyParams({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true }
    })
    const user = await User.findOne(ctx.request.body)
    if (user) {
      const { _id, username } = user
      const token = jwt.sign({ username, id: _id }, secret, { expiresIn: '3d' })
      ctx.body = message({
        token,
        expires: 3
      })
    } else {
      ctx.body = message('用户名或密码不正确')
    }
  }
}
