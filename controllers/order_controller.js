const orderModel = require('../models/order.schema');
const {display_costume_error} = require('../functions/global_functions/display_costume_error');
const {display_error_message} = require('../functions/global_functions/display_error_message');
const validator = require('../middleware/validatorRequiredData');
const verifPaymentDetailt = require('../functions/paymentFunctions/verifPaymentDetailt');
const getProduct = require('../functions/global_functions/getProduct');
const getCartDataAfterDiscount = require('../functions/global_functions/getCartDataAfterDiscount');
const getCartData = require('../functions/global_functions/getCartData');
const rechargeWallet= require('../functions/walletFunctions/rechargeWallet')
const getGiftCardVoucherAndCreateOrder = require('../functions/voucherFunctions/getGiftCardVoucher');
const { default: axios } = require('axios');



exports.makeTranscationOforder = async (req, res) => {
  try {
    
  
  if (validator(req.body, ['paymentMethod', "typeOfPurchase"], res)) { return; }
  const { paymentMethod, typeOfPurchase } = req.body
  if ((typeOfPurchase !== 'wallet') && (typeOfPurchase !== 'voucher')) {
    display_costume_error(res, 'error in typeOfPurchase ', 400);
    return
  }
  if ((typeOfPurchase === 'wallet') && (paymentMethod === 'wallet')) {
    display_costume_error(res, 'you cant recharge wallet with wallet ', 400);
    return
  }
  if ((paymentMethod !== 'wallet') && (paymentMethod !== 'card')) {
    display_costume_error(res, 'error in payment method ', 400);
    return
  }

  //get user cart info
  const cart = await getCartData(req) //get user cart info

  //get cart date after calculating discount
  const CartDataAfterDiscount = getCartDataAfterDiscount(cart, req)

  //check if payment is equal to card total
    Promise.all(CartDataAfterDiscount).then(async CartDataAfterDiscountAfterWatingToProcces => {
      try {
          let paymetnData = await verifPaymentDetailt(req.body.paimentId, CartDataAfterDiscountAfterWatingToProcces,typeOfPurchase,req.body.amount,req)
        if (paymetnData.transactionState === true) {
            if (paymentMethod === 'card') {
              if (typeOfPurchase === 'voucher') {
                //
                const awaitVoucher = await getGiftCardVoucherAndCreateOrder(CartDataAfterDiscountAfterWatingToProcces, paymetnData, req.verified.profileId)
                const finalData = await Promise.all(awaitVoucher)
                orderModelSaved = orderModelCreation(req.verified.profileId, paymetnData, finalData.map(e => e.products))
                await orderModelSaved.save()
                axios.delete('https://staging.products.t7d.io/cart/emptyCart',{ headers: {'Authorization': `${req.headers.authorization}` }
                },{ profileId: req.verified.profileId }).then(() => {
                      res.status(res.statusCode).json({ message: "order complete" })
                }).catch(error => {
                        display_error_message(res, error)
                }) ///empty cart after payment

              } else {
                let response = await rechargeWallet(req, paymetnData.amount, res)
                res.status(res.statusCode).json({ ...response });
              }
            } else {
              if (typeOfPurchase === 'voucher') {
                const awaitVoucher = await getGiftCardVoucherAndCreateOrder(CartDataAfterDiscountAfterWatingToProcces, paymetnData, req.verified.profileId)
                const finalData = await Promise.all(awaitVoucher)
                orderModelSaved = orderModelCreation(req.verified.profileId, paymetnData, finalData.map(e => e.products))
                await orderModelSaved.save()
                axios.delete('https://staging.products.t7d.io/cart/emptyCart',{ headers: {'Authorization': `${req.headers.authorization}` }
                },{ profileId: req.verified.profileId }).then(() => {
                      res.status(res.statusCode).json({ message: "order complete" })
                }).catch(error => {
                        display_error_message(res, error)
                }) ///empty cart after payment
              }
            }
          } else {
            display_costume_error(res, 'error transaction', 400);
          }
      } catch (error) {
        display_costume_error(res, error, 400);
    }
    

  })
  } catch (error) {
      display_error_message(res, error)
}
}


const orderModelCreation = (profile_id, paymentData, products) => {
    return new orderModel({
      profile_id,
      paymentData,
      products: [...products.map(e => { return {giftCardId:e.giftCardId,supplements:{sku:e.supplements.sku,voucherKey:e.supplements.voucherKey.data.data}}})]
    });
}