const express = require('express')
const router = express.Router()
const check_auth = require('../middleware/check_auth')

const orderController = require('../controllers/order_controller')

router.post('/makeTranscationOforder',check_auth, orderController.makeTranscationOforder)

module.exports = router
