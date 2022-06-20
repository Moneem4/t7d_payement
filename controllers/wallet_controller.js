const walletModel = require('../models/wallet.schema');
const {display_error_message} = require('../functions/global_functions/display_error_message');
const mongoose = require('mongoose');

exports.getWallet = (req, res) => {
    walletModel.findOne({ profile_id: mongoose.Types.ObjectId(req.verified.profileId) }).exec().then(data => {
                              res.status(res.statusCode).json({ message: "order complete",data })
    }).catch(error => {
        display_error_message(res, error)
    })
}