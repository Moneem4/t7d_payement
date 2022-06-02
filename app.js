require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const connectDB = require('./config/connect_db');
const cors = require('cors');
const order_route = require('./routes/order_route')
const wallet_route = require('./routes/wallet_route')

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/orders', order_route);
//app.use('/wallet', wallet_route);

app.use((req, res) => {
    res.status(404).json({ error: 'page not found' })
})
const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server listning on port ${PORT}`);
});
