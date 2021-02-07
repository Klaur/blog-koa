const path = require('path')
const Image = require('../models/image')
const message = require('../utils/message')
const fileUtils = require('../utils/file')
module.exports = {
  async upload(ctx, next) {
    const img = await new Image({
      url: `/${ctx.uploadpath.file}`,
      md5: ctx.md5
    }).save()
    if (img) {
      ctx.body = message({
        img: {
          id: img._id,
          url: `${ctx.origin}/${ctx.uploadpath.file}`
        }
      })
    } else {
      ctx.body = message(img)
    }
  }
}
