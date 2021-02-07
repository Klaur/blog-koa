const { Schema, model } = require('mongoose')

const imageSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  md5: {
    type: String
  }
})
module.exports = model('Image', imageSchema)
