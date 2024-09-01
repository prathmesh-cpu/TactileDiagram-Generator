const express = require('express')
const {
  checkout,
  paymentVerification,
} = require("../controllers/paymentController");

const routes = express.Router();

//router.route("/checkout").post(checkout);

routes.post('/checkout', checkout);
routes.post('/paymentverification', paymentVerification);


// router.route("/paymentverification").post(paymentVerification);

module.exports = routes 