const mongoose = require('mongoose');


const wallet = mongoose.Schema(
    {
        profile_id:{type:String,required: true},
        accountBalance: { type: Number  },
        GDBalance: { type: Number },
        currency: { type: String,enum: ['USD', 'EURO'] },
    },
  { timestamps: true }
);



module.exports  = mongoose.model('wallet', wallet);
