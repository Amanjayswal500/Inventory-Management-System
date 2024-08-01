const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  checkout_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'checkout',
    required: true
  },
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  date_of_creation: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
});

const Transaction = mongoose.model('transaction', TransactionSchema);
module.exports = Transaction;
