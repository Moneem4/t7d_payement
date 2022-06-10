
const rpt = require('../global_functions/returnPromiseForItem')


 function  verifPaymentDetailt (paimentId, CartDataAfterDiscount) {
    const PaymentData = getPaymentData(paimentId)
    const totalOfCart =  CartDataAfterDiscount.filter(e => e != false).reduce((total, currentValue, index,array) => {
        if (index + 1 === array.length) {
               return Promise.resolve(total + currentValue.priceAfterDiscount)
        } else {
                return total + currentValue.priceAfterDiscount
        }
    }, 0)
     return totalOfCart.then(data => {
     if(PaymentData.amount === data)
     {
            return Promise.resolve({
                ...PaymentData,
                transactionState:true
            })
        } else {
        return Promise.resolve({
            ...PaymentData,
            transactionState:false
        })
    }
    })

}

module.exports = verifPaymentDetailt




function getPaymentData(paimentId){
    return {
        "amount": 339.5,
        "provided":"x"
    }
}