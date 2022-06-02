const orderModel = require('../models/order.schema');
const {display_costume_error} = require('../global_functions/display_costume_error');
const {display_error_message} = require('../global_functions/display_error_message');
const validator = require('../middleware/validatorRequiredData');
const mongoose = require('mongoose');

exports.makeTranscationOforder = (req, res) => {
        res.status(res.statusCode).json({
          message: 'the payment was successfully made',
        });
}