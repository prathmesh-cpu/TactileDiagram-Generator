const jwt = require('jsonwebtoken')
require('dotenv').config()
exports.auth = async (req, res, next) => {

    try {
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
        const jwtResponse = await jwt.verify(token, process.env.PRIVATE_KEY)
        if (jwtResponse) {
            req.payload = jwtResponse
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Not token is not readable"
            })
        }
    } catch (err) {
        console.log("Unable to recognise token : ",err);
        return res.status(500).json({
            success: false,
            message: "Unable to recognise token"
        });
    }
    next();
}

exports.isCustomer = (req, res, next) => {
    try {
        const {payload }= req
        if (payload.role !== 'Customer') {
            return res.status(200).json({
                success: false,
                message: "It is protected route for Customer"
            })
        }
        next();
    } catch (err) {
        console.log('Unable to process token',err);
        return res.status(500).json({
            success: false,
            message: "Unable to process token"
        })
    }
}

exports.isAdmin = (req, res, next) => {
    console.log("I reach to admin");
    try {
        const {payload} = req
        if (payload.role !== 'Admin') {
            return res.status(200).json({
                success: true,
                message: "It is protected route for Admin"
            })
        }
        next()
    } catch (err) {
        console.log('Unable to process token',err);
        return res.status(500).json({
            success: true,
            message: "Unable to process token"
        })
    }
}

exports.isSeller = (req, res, next) => {
    try {
        const { payload }= req
        if (payload.role !== 'Seller') {
            return res.status(200).json({
                success: true,
                message: "It is protected route for Seller"
            })
        }
        next();
    } catch (err) {
        console.log('Unable to process token',err);
        return res.status(500).json({
            success: true,
            message: "Unable to process token"
        })
    }
}