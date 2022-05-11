require('dotenv').config();

const express = require('express');
const connectDB = require('./config/connect_db');
const cors = require('cors');
const paymentRoute = require('./routes/payment');
const walletRoute = require('./routes/wallet');
const cardInfoRoute = require('./routes/card_info');

const app = express();
app.use(express.json());
app.use(cors());
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
const morgan = require('morgan');
const ecsFormat = require("@elastic/ecs-morgan-format");
app.use('/api/payment', paymentRoute);
app.use('/api/wallet', walletRoute);
app.use('/api/cardInfo', cardInfoRoute);

const PORT = process.env.PORT || 3000;
app.use(morgan(ecsFormat('tiny')));

connectDB();

app.listen(PORT, () => {
  console.log(`Server listning on port ${PORT}`);
});
// require('crypto').randomBytes(32, function(err, buffer) {
//   var token = buffer.toString('base64');
//   console.log("664" , token)
// });

// //64 bytes
// require('crypto').randomBytes(64, function(err, buffer) {
//   var token = buffer.toString('base64');
//   console.log("323" , token)

// });