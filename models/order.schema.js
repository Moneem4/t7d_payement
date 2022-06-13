const mongoose = require('mongoose');


const orders = mongoose.Schema(
  {
    profile_id: {type: String,required: true},
    paymentData: {type: Object,required: true},
    products: [{ giftCardId:{type: mongoose.Schema.Types.ObjectId},supplements:{type:Object} }],
  },
  { timestamps: true }
);


module.exports  = mongoose.model('orders', orders);



