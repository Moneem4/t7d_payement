const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({}, { timestamps: true });
module.exports = Payment = mongoose.model('Payment', paymentSchema);
