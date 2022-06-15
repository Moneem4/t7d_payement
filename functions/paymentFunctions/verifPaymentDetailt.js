
const rpt = require('../global_functions/returnPromiseForItem')
const axios = require('axios')
const {display_error_message} = require('../../functions/global_functions/display_error_message');

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

        const checkout = await axios.post('https://api.sandbox.checkout.com/payments',
         {
            "source": {
                "type": "token",
                "token": req.body.token
            },
            "amount": amount,
            "currency": "USD"
        }
        , {
            headers: {'Authorization': `${process.env.AUTH_TOKEN}` }
        }
        )
        if (checkout.status === 201) {
            if (checkout.data.approved === true) {
                return Promise.resolve({
                "amount": amount,
                id:checkout.data.id,
                transactionState: true
            })
            } else {
                return Promise.resolve({
                "amount": amount,
                id:checkout.data.id,
                transactionState: false
            })
            }
        } else {
            return Promise.resolve({
                "amount": amount,
                id:checkout.data.id,
                transactionState: false
            })
        }

        } catch (error) {
            return Promise.reject(error.message)
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
    
         return totalOfCart.then(async data => {
        const checkout = await axios.post('https://api.sandbox.checkout.com/payments',
         {
            "source": {
                "type": "token",
                "token": req.body.token
            },
            "amount": data,
            "currency": "USD"
        }
        , {
            headers: {'Authorization': `${process.env.AUTH_TOKEN}` }
        }
        )
        if (checkout.status === 201) {
            if (checkout.data.approved === true) {
                return Promise.resolve({
                id: checkout.data.id,
                "amount": amount,
                transactionState: true
            })
            } else {
                return Promise.resolve({
                id: checkout.data.id,
                "amount": amount,
                transactionState: false
            })
            }
        } else {
               return Promise.resolve({
                 id: checkout.data.id,
                "amount": amount,
                transactionState: false
            })
        }

    })  
     } else {
            return Promise.reject(error.message)
    }

}