const rpt = require('./returnPromiseForItem')


const getCartDataAfterDiscount = (cart, req) => {
    return cart.data.data.giftCardsId.map(e => {
            let id = e.gifCardId != null && {sku:e.gifCardId.sku,giftcarid:e.gifCardId._id,price:e.gifCardId.price,discountPremium:e.gifCardId.discountPremium,discount:e.gifCardId.discount,priceAfterDiscount:req.verified.premium ===true ?(e.gifCardId.price * (1-(e.gifCardId.discountPremium/100))) : (e.gifCardId.price * (1-(e.gifCardId.discount/100)))}
            return rpt(id)
       })
}
module.exports =getCartDataAfterDiscount