const mongoose = require('mongoose');


const scores = mongoose.Schema(
    {
        profile_id:{type:String,required: true},
        accountBalance: { type: Double  },
        GDBalance: { type: String },
        currency: { type: String,enum: ['USD', 'EURO'] },
    },
  { timestamps: true }
);



module.exports  = mongoose.model('scores', scores);
