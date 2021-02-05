module.exports = function (info) {
  if (typeof info === 'object') {
    return {
      code: 200,
      data: info,
      message: ''
    }
  } else {
    return {
      code: -1,
      data: '',
      message: info
    }
  }
}
