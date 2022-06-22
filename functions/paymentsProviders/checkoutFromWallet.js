
const mongoose = require('mongoose');
const wallet = require('../../models/wallet.schema')

module.exports = async function checkout(walletData,amountToPurches,req) {
    
    try {
      const  {accountBalance} = walletData 
      if(amountToPurches > accountBalance){
        return Promise.resolve({
            transactionState: false,
            error:{'error':true,message:'not enough money in wallet'}
        })
      }else{
        await wallet.findOneAndUpdate({profile_id:mongoose.Types.ObjectId(req.verified.profileId)},{$set:{accountBalance:accountBalance-amountToPurches}})

        return Promise.resolve({
            transactionState: true,
            error:{'error':true,message:'succes'}
        })
      }
    }catch(error){
        return Promise.resolve({
            transactionState: false,
            error:error
        })
    }
}