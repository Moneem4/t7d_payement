const walletModel = require('../models/wallet.schema');
const {display_error_message} = require('../functions/global_functions/display_error_message');
const mongoose = require('mongoose');

exports.getWallet = (req, res) => {
    walletModel.findOne({ profile_id: mongoose.Types.ObjectId(req.verified.profileId) }).exec().then(data => {
        if (data === null){
            const Walletd = createWalletModel(req.verified.profileId, 0)
            Walletd.save().then(async () => {
                res.status(res.statusCode).json({ message: "wallet",Walletd })
            })
            return
        }
        res.status(res.statusCode).json({ message: "wallet",data })
    }).catch(error => {
        display_error_message(res, error)
    })
}


const createWalletModel = (profileid,amount) => {
    return new walletModel({
      profile_id:profileid,
      accountBalance:amount,
      GDBalance:0,
      currency:'USD'
    });
}