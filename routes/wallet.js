const express = require('express');
const router = express.Router();
const WalletModel = require('../models/wallet.schema');
const {
  editWallet,
  findWalletById,
} = require('../controllers/walletController');

var amqp = require('amqplib');
let connection;
let channel;
const QUEUE_NAME = 'square';

// create rabbit mq connection to instantiate a wallet to user who have activated his account
const rabbitConnect = async () => {
  try {
    connection = await amqp.connect('amqp://Galactech:rabbit@15.237.12.241');
    channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME);
    channel.consume(
      QUEUE_NAME,
      async (msg) => {
        const wallet = new WalletModel({
          user_id: JSON.parse(msg.content.toString()),
        });
        const result = await wallet.save();
        console.log(result);
      },
      {
        noAck: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

rabbitConnect();

// Alter user's wallet with personal infos : parameter {wallet_id} / body = JSON object : {amount, GD_amount, currency, card_number, card_expire_date, saved}
router.post('/editWallet/:id', editWallet);
//find wallet by id : parameter {wallet_id}
router.get('/findWalletById/:id', findWalletById);
module.exports = router;
