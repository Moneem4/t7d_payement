const axios = require('axios')
const buyWithSavedCard = require('../global_functions/buyWithSavedCard')
module.exports = async function checkout(req, amount) {
        if (req.body.card === 'FromUserCard') {
            const bwsc = buyWithSavedCard(req, amount)
            if (bwsc === 404 || bwsc === 500) {
                return Promise.resolve({
                "amount": amount,
                id:bwsc.data.id,
                transactionState: false,
                error:"cant buy with your card"
            })
            } else {
                return Promise.resolve({
                "amount": amount,
                id:bwsc.data.id,
                transactionState: false
            })
            }
        } else {
        const checkout = await axios.post('https://api.sandbox.checkout.com/payments',
         {
            source: {
                type: "token",
                token: req.body.token
             },
            currency: "USD",
            amount: amount-0
        }
        , {
            headers: {'Authorization': `${process.env.AUTH_TOKEN}` }
        }
    )

            if (checkout.status === 201) {
            /*
                            const userCard = new RechargeWalletHistory({
                        profile_id:profileid,
                        wallet_id:wallet_id,
                        amount: amount,
                        state,
                        errorMessage,
                        paymentData:paymetnDatarechargeWalletHistory
                        });
            
            */
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
        }
}