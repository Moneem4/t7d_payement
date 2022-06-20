const axios = require('axios')
module.exports = async function checkout(req, amount) {

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