const path = require('path')
const message = require('../utils/message')
module.exports = {
  async upload(ctx, next) {
    const file = ctx.request.files.file
    const basename = path.basename(file.path)
    ctx.body = message({ path: file.path, url: `${ctx.origin}/${ctx.uploadpath.file}` })
  }
}
