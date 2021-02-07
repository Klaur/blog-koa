const path = require('path')
const fs = require('fs')
const md5 = require('md5')
module.exports = {
  //检查文件是否存在，不存在就创建目录
  checkDirExist(p) {
    if (!fs.existsSync(p)) {
      console.log('路径不存在')
      fs.mkdirSync(p, { recursive: true })
    }
  },
  //获取文件后缀名
  getUploadFileExt(name) {
    let ext = name.split('.')
    return ext[ext.length - 1]
  },
  getUploadFileExt(name) {
    let ext = name.split('.')
    return ext[ext.length - 1]
  },
  getUploadFileName(name, ext) {
    const date = Date.now()
    return `${name}_${date}.${ext}`
  },
  //获取图片上传路径文件夹 年月日
  getUploadDirName() {
    const date = new Date()
    let month = Number.parseInt(date.getMonth()) + 1
    let day = date.getDate()
    month = month.toString().length > 1 ? month : `0${month}`
    day = day.toString().length > 1 ? day : `0${day}`
    const dir = `${date.getFullYear()}${month}${day}`
    return dir
  },
  getMd5(file) {
    let md5Code = md5(file)
    console.log('md5Code', md5Code)
    return md5Code
  }
}
