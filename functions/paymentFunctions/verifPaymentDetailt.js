
const rpt = require('../global_functions/returnPromiseForItem')
const axios = require('axios')
const {display_error_message} = require('../../functions/global_functions/display_error_message');
const checkout = require('../paymentsProviders/checkout')
 function verifPaymentDetailt(paimentId, CartDataAfterDiscount, typeOfPurchase, amount, req,res,token) {
    try {
        
   
    if (typeOfPurchase === 'wallet') {
        if (amount === undefined || amount === 0 || isNaN(amount)) {
                return Promise.reject("amount cannot be undefiend or  0")
        } else {
            return rechargeWallet(req,amount)
         }
    } else {
            return payVoucher(req)
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


const payVoucher = () => {
    CartDataAfterDiscount = [...CartDataAfterDiscount]
     if (CartDataAfterDiscount.length !== 0) {
          const totalOfCart =  CartDataAfterDiscount.filter(e => e != false).reduce((total, currentValue, index,array) => {
        if (index + 1 === array.length) {
               return Promise.resolve(total + currentValue.priceAfterDiscount)
        } else {
                return total + currentValue.priceAfterDiscount
        }
    }, 0)
    
         return totalOfCart.then(async amount => {
            return  checkout(req,amount)

    })  
     } else {
            return Promise.reject(error.message)
    }

}