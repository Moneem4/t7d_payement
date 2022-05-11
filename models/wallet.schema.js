const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const walletSchema = new Schema(
  {
    amount: {
      type: String,
      lowercase: true,
      amount: 'amount',
    },
    GD_amount: {
      type: String,
      lowercase: true,
      default: 'GD amount will be increased during your journey on T7D',
    },
    currency: {
      type: String,
      lowercase: true,
      default: 'currency could be updated',
    },
    recharge_date: {
      type: Date,
      lowercase: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    card_number: {
      type: String,
      lowercase: true,
      default: '**** **** **** ****',
    },
    card_expire_date: {
      type: String,
      lowercase: true,
      default: 'DD/YYYY',
    },
    CVV: {
      type: String,
      lowercase: true,
      default: '****',
    },
    saved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = Wallet = mongoose.model('Wallet', walletSchema);
