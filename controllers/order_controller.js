const orderModel = require('../models/order.schema');
const {display_costume_error} = require('../functions/global_functions/display_costume_error');
const {display_error_message} = require('../functions/global_functions/display_error_message');
const validator = require('../middleware/validatorRequiredData');
const verifPaymentDetailt = require('../functions/paymentFunctions/verifPaymentDetailt');
const getProduct = require('../functions/global_functions/getProduct');
const getCartDataAfterDiscount = require('../functions/global_functions/getCartDataAfterDiscount');
const getCartData = require('../functions/global_functions/getCartData');
const rechargeWallet= require('../functions/walletFunctions/rechargeWallet')




exports.makeTranscationOforder = async (req, res) => {
  if (validator(req.body, ['paymentMethod',"typeOfPurchase"], res)) { return; }
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
    let paymetnData = await verifPaymentDetailt(req.body.paimentId, CartDataAfterDiscountAfterWatingToProcces)
      if (paymetnData.transactionState === true) {
        if (paymentMethod === 'card') {
          if (typeOfPurchase === 'voucher') {
              
          } else {
            let response =  await rechargeWallet(req, paymetnData.amount, res)
              res.status(res.statusCode).json({...response});
          }
        } else {
              if (typeOfPurchase === 'voucher') {
              
          } else {
            
          }
        }
        } else {
          display_costume_error(res, 'error transaction', 400);

        }
  })

  /*try {
  
  const cart = await axios.get('https://staging.products.t7d.io/cart/getFromCart',
    {headers: {
    'Authorization': `${req.headers.authorization}` 
  }}
    )*/

   // console.log(orderids)
   /* productKey = getProduct()
   if (productKey !== false) {
     if (makePayment() === true) {  
          
        } else {
        display_costume_error(res, 'error transaction', 400);
        }
    } else {
       display_costume_error(res, 'product not available transaction', 400);
    }

        res.status(res.statusCode).json({
          message: 'the payment was successfully made',
        });
  } catch (error) {
          display_error_message(res, error);

    }*/
}





