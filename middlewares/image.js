const md5 = require('md5')
const fs = require('fs')
const message = require('../utils/message')
const Image = require('../models/image')
const image = require('../models/image')
const checkExist = async (ctx, next) => {
  const file = ctx.request.files.file
  let buf = fs.readFileSync(file.path)
  if (buf) {
    let md5Code = md5(buf)
    // console.log('-------------', md5Code)
    ctx.md5 = md5Code
    const img = await Image.findOne({ md5: md5Code })
    if (img) {
      fs.rmdirSync(file.path, { recursive: true })
      ctx.body = message({
        img: {
          url: `${ctx.origin}${img.url}`,
          id: img._id
        }
      })
    } else {
      console.log('未找到')
      await next()
    }
  } else {
    ctx.body = message(err)
  }
}
module.exports = checkExist
