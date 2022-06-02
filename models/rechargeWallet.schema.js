const mongoose = require('mongoose');


const scores = mongoose.Schema(
    {
        profile_id:{type:String,required: true},
        wallet_id:{type:String,required: true},
        amount: { type: Double  },
    },
  { timestamps: true }
);



module.exports  = mongoose.model('scores', scores);
