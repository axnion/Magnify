const mongoose = require('mongoose')
const Schema = mongoose.Schema

const account = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: true
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
    required: true
  }
})

module.exports = mongoose.model('Account', account)
