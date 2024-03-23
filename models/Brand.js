const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  Name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 30
  },
  Country: {
    type: String,
    required: true,
    maxlength: 20,
    default: "Switzerland"
  },
  Founded: {
    type: Number,
    required: true,
    max: [Date.now(), "Jövőben alapítandó céget nem tartalmazhat az adatbázis!"]
  }
})

module.exports = mongoose.model('Brand', brandSchema, 'brands')
