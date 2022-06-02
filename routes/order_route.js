const express = require('express')
const router = express.Router()

const orderController = require('../controllers/order_controller')

router.post('/makeTranscationOforder', orderController.makeTranscationOforder)

module.exports = router
