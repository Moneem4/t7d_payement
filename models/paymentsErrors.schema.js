const mongoose = require('mongoose');


const paymentsErrors = mongoose.Schema(
  {
    profile_id: {type: String,required: true},
    errorsData:{type:Object}
  },
  { timestamps: true }
);


module.exports  = mongoose.model('paymentsErrors', paymentsErrors);



