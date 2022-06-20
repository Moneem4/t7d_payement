const express = require('express')
const router = express.Router()
const check_auth = require('../middleware/check_auth')

const WalletController = require('../controllers/wallet_controller')

router.get('/getWallet',check_auth, WalletController.getWallet)

module.exports = router
