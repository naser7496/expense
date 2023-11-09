// models/Expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  description: String,
  amount: String,
  date: { type: Date, default: Date.now },
  category:String,
  // refrence to User model's id
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
});

module.exports = mongoose.model('Expense', expenseSchema);
