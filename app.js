const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const path = require('path')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const { mongoDBAddress } = require('./configs/secret')
const mongoose = require('mongoose')
const parameter = require('koa-parameter')
const fileUtils = require('./utils/file')
const index = require('./routes/index')
const user = require('./routes/user')
const common = require('./routes/common')
const blog = require('./routes/blog')
mongoose.connect(mongoDBAddress, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('MongoDB:链接成功!')
})
mongoose.connection.on('err', console.error)
// error handler
onerror(app)

// middlewares
app.use(
  cors({
    origin: function (ctx) {
      console.log(ctx)
      return ctx.header.origin
    },
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT', 'PATCH'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
  })
)
// app.use(
//   bodyparser({
//     enableTypes: ['json', 'form', 'text']
//   })
// )
app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, '/static/uploads/images'),
      keepExtensions: true,
      onFileBegin: (name, file) => {
        // console.log(file);
        // 获取文件后缀
        const fileHasExt = fileUtils.getUploadFileExt(file.name)
        // 最终要保存到的文件夹目录
        const dirName = `upload/${fileUtils.getUploadDirName()}`
        const dir = path.join(__dirname, 'static/' + dirName)
        // 检查文件夹是否存在如果不存在则新建文件夹
        fileUtils.checkDirExist(dir)
        // 重新覆盖 file.path 属性
        const fileName = fileUtils.getUploadFileName(name, fileHasExt)
        file.path = `${dir}/${fileName}`
        app.context.uploadpath = app.context.uploadpath ? app.context.uploadpath : {}
        app.context.uploadpath[name] = `${dirName}/${fileName}`
      },
      onError: err => {
        console.log(err)
      }
    }
  })
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/static'))
app.use(parameter(app))
app.use(
  views(__dirname + '/views', {
    extension: 'pug'
  })
)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(common.routes(), common.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
