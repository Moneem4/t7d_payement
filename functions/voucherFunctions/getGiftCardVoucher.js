const axios  = require('axios')

function getGiftCardVoucherAndCreateOrder(products,paymentData,profile_id)  {
    return products.map(async e => {
        
       return {
           products: {
               'giftCardId':e.giftcarid,
               supplements: {
                   ...e,
                   voucherKey:await axios.get("https://staging.teams.t7d.io/teams/allTeams")
               }
           },
           paymentData,
           profile_id
        }
    })
    
}

module.exports = getGiftCardVoucherAndCreateOrder