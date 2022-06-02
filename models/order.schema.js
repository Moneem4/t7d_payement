const mongoose = require('mongoose');


const scores = mongoose.Schema(
  {
    profile_id: {type: String,required: true},
    paymentData: {type: String,required: true},
    products: [{
    productId:{ type: String },
    numberOfProduct: { type: Number }}],
  },
  { timestamps: true }
);



module.exports  = mongoose.model('scores', scores);
