const Razorpay = require('razorpay');
require('dotenv').config()

exports.instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
});