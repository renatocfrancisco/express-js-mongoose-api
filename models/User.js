const mongoose = require('mongoose')

const user = new mongoose.Schema({
  username: String,
  password: String,
  rep_codigo: Number,
  level: Number
}, { timestamps: true, versionKey: false })

const User = mongoose.model('User', user)

module.exports = User
