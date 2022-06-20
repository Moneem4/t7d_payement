const mongoose = require('mongoose');
const RechargeWalletHistory = require('../../models/rechargeWalletHistory.schema')
const Wallet = require('../../models/wallet.schema')
const {display_error_message} = require('../../functions/global_functions/display_error_message');

module.exports = rechargeWallet = async (req, amount,res,paymetnData) => {
    let returnMessage
    let walletHistorySaved
    try {

        const wallet = await Wallet.findOne({ profile_id: req.verified.profileId })
        if (wallet === null) {
            let WalletModel = createWalletModel(req.verified.profileId, amount)

            await WalletModel.save().then(async () => {

                 let WalletHistory = createWalletHistoryModel(req.verified.profileId,WalletModel._id,amount,"ok","wallet was recharged",paymetnData)
                  walletHistorySaved = await WalletHistory.save()
                returnMessage = { state: true, message: 'wallet was recharged' }
            }).catch(async error => {
                let WalletHistory = createWalletHistoryModel(req.verified.profileId,WalletModel._id,amount,"ok","problem in refling wallet",paymetnData)
                 walletHistorySaved = await WalletHistory.save()
                 returnMessage = {state: true,message:error.message}
            })
        } else {

            wallet.accountBalance = wallet.accountBalance + amount
               await wallet.save().then(async () => {
                 let WalletHistory = createWalletHistoryModel(req.verified.profileId,wallet._id,amount,"ok","wallet was recharged",paymetnData)
                  walletHistorySaved = await WalletHistory.save()
                 returnMessage = {state: true,message:'wallet was recharged'}
            }).catch(async error => {
                let WalletHistory = createWalletHistoryModel(req.verified.profileId,wallet._id,amount,"ok","problem in refling wallet",paymetnData)
                 walletHistorySaved = await WalletHistory.save()
                 returnMessage = {state: true,message:error.message}
            })
        }
        return Promise.resolve(returnMessage)
    } catch (error) {

            display_error_message(res, error)
        }
    
}


 


const createWalletModel = (profileid,amount) => {
    return new Wallet({
      profile_id:profileid,
      accountBalance:amount,
      GDBalance:0,
      currency:'USD'
    });
}
const createWalletHistoryModel = (profileid,wallet_id,amount,state,errorMessage,paymetnData) => {
    return new RechargeWalletHistory({
      profile_id:profileid,
      wallet_id:wallet_id,
      amount: amount,
      state,
      errorMessage,
      paymentData:paymetnData
    });
}




