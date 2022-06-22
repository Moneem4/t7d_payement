
const checkout = require('../paymentsProviders/checkout')
const wallet = require('../../models/wallet.schema')
const checkoutFromWallet = require('../../functions/paymentsProviders/checkoutFromWallet')
const mongoose = require('mongoose');

 function verifPaymentDetailt(paimentId, CartDataAfterDiscount, typeOfPurchase, amount, req,res,token) {
    try {
        
   
    if (typeOfPurchase === 'wallet') {
        if (amount === undefined || amount === 0 || isNaN(amount)) {
                return Promise.reject("amount cannot be undefiend or  0")
        } else {
            return rechargeWallet(req,amount)
         }
    } else {
            return payVoucher(CartDataAfterDiscount,req)
     }
    } catch (error) {
         return Promise.reject(error.message)

 }


}

module.exports = verifPaymentDetailt




const  rechargeWallet = async (req,amount) => {
    try {
        return  checkout(req,amount)

        } catch (error) {
            return Promise.reject(error)
        }
   
}


const payVoucher = async (CartDataAfterDiscount,req) => {

    CartDataAfterDiscount = [...CartDataAfterDiscount]
     if (CartDataAfterDiscount.length !== 0) {
          const totalOfCart =  CartDataAfterDiscount.filter(e => e != false).reduce((total, currentValue, index,array) => {
        if (index + 1 === array.length) {
               return Promise.resolve(total + currentValue.priceAfterDiscount)
        } else {
                return total + currentValue.priceAfterDiscount
        }
    }, 0)
    if(req.body.typeOfPurchase === 'voucher' && req.body.paymentMethod === 'wallet'){
       const walletData = await wallet.findOne({profile_id:mongoose.Types.ObjectId(req.verified.profileId)})
       return totalOfCart.then(async amount => {
        return  checkoutFromWallet(walletData,amount,req)
        })  
    }else{
            return totalOfCart.then(async amount => {
                return  checkout(req,amount)
        })  
    }

     } else {
            return Promise.reject('your card is empty')
    }

}




