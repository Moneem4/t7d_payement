const axios = require('axios').default;

const getCartData = (req) => {
  return  axios.get('https://staging.products.t7d.io/cart/getFromCart',
    {headers: {
    'Authorization': `${req.headers.authorization}` 
  }}
)
  }  
module.exports = getCartData

