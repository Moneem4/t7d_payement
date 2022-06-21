const axios = require('axios')
const buyWithSavedCard = require('../global_functions/buyWithSavedCard')
const userCards = require('../../models/userCards');
const mongoose = require('mongoose');

module.exports = async function checkout(req, amount) {
    try {
        
    
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
                
              const checkifThreisCard = await  userCards.findOne({
                    $and: [{ profile_id: mongoose.Types.ObjectId(req.verified.profileId) }, { 'cardsDetails.expiry_month': checkout.data.source.expiry_month },
                        { 'cardsDetails.expiry_year': checkout.data.source.expiry_year },
                        { 'cardsDetails.name': checkout.data.source.name}, { 'cardsDetails.last4':checkout.data.source.last4 }, { 'cardsDetails.scheme':checkout.data.source.scheme }]
                })
                    const userC = new userCards({
                    profile_id:req.verified.profileId,
                    cardsDetails:checkout.data.source,
                    });
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
                return Promise.resolve({
                "amount": amount,
                id:checkout.data.id,
                transactionState: false
            })
            }
        } else {
            return Promise.resolve({
                "amount": amount,
                transactionState: false,
                error:error

            })
        }
        }
    } catch (error) {
                return Promise.resolve({
                "amount": amount,
                transactionState: false,
                error:error
            })
        }
}