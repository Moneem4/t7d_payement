const mongoose = require('mongoose');


const rechargeWalletHistory = mongoose.Schema(
    {
        profile_id:{type:String,required: true},
        wallet_id:{type:String,required: true},
        amount: { type: Number },
        state: {type:String},
        errorMessage:{type:String}
    },
  { timestamps: true }
);



module.exports  = mongoose.model('rechargeWalletHistory', rechargeWalletHistory);
