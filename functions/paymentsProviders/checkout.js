const axios = require('axios')
const buyWithSavedCard = require('../global_functions/buyWithSavedCard')
const userCards = require('../../models/userCards');
const mongoose = require('mongoose');
const paymentsErrors = require('../../models/paymentsErrors.schema');

module.exports = async function checkout(req, amount) {
    try {
        
    // hedha  wakt chi khales min carta kdima
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
                const checkout = await paymentApi(req,amount,"USD")

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
        } else {
        const checkout = await paymentApi(req,amount,"USD")
            if (checkout.status === 201) {
                const checkifThreisCard = await  checkIfCardInUserModelsCard(checkout,req)
                const userC = new userCards({profile_id:req.verified.profileId,cardsDetails:checkout.data.source});
                if (checkifThreisCard === null) {
                    userC.save()
                }
            if (checkout.data.approved === true) {
                return Promise.resolve({
                "amount": amount,
                id:checkout.data.id,
                transactionState: true
            })
            } else {
            const paymentsE = new paymentsErrors({
                profile_id:req.verified.profileId,
                errorsData:{
                    request_id:'',
                    error_type:checkout.data.response_code. response_summary,
                    error_codes:[checkout.data.response_code]
                },
                provider:'checkout'
                });
                paymentsE.save()
                return Promise.resolve({
                    "amount": amount,
                    transactionState: false,
                    id:checkout.data.id,
                    error:{
                    request_id:'',
                    requestPaymentId:checkout.data.id,
                    error_type:checkout.data.response_summary,
                    error_codes:[checkout.data.response_code]
                }
            })
            }
        } else {
            return Promise.resolve({
                "amount": amount,
                transactionState: false,

            })
        }
        }
    } catch (error) {
            const paymentsE = new paymentsErrors({
            profile_id:req.verified.profileId,
            errorsData:error.response.data,
            provider:'checkout'
            });
            paymentsE.save()
                return Promise.resolve({
                "amount": amount,
                transactionState: false,
                error:error
            })
        }
}



const checkIfCardInUserModelsCard=(checkout,req)=>{
    return userCards.findOne({
        $and: [{ profile_id: mongoose.Types.ObjectId(req.verified.profileId) }, { 'cardsDetails.expiry_month': checkout.data.source.expiry_month },
            { 'cardsDetails.expiry_year': checkout.data.source.expiry_year },
            { 'cardsDetails.name': checkout.data.source.name}, { 'cardsDetails.last4':checkout.data.source.last4 }, { 'cardsDetails.scheme':checkout.data.source.scheme }]
    })
}



const paymentApi=(req,amount,currency)=>{
 return axios.post('https://api.sandbox.checkout.com/payments',
 {
    source: {
        type: "token",
        token: req.body.token
     },
    currency: currency,
    amount: amount-0
}
, {
    headers: {'Authorization': `${process.env.AUTH_TOKEN}` }
}
)
}