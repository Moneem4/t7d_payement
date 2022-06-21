const mongoose = require('mongoose');


const userCards = mongoose.Schema(
    {
        profile_id:{type:String,required: true},
        cards: [{ type:Object}]
    },
  { timestamps: true }
);



module.exports  = mongoose.model('userCards', userCards);
