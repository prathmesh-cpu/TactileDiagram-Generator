const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')
require('dotenv').config()
exports.signup = async (req,res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            role,
        } = req.body


        // Validations 
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Fill data properly"
            })
        }

        // Email validation
        const isEmail = await User.findOne({ email: email })
        if (isEmail) {
            return res.status(409).json({
                success: false,
                message: "User already exist"
            })
        }

        //Pass and confirmPass
        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Password and Confirm Password doesn't matches"
            })
        }

        // Otp validation 

        // Password hashing 
        const hashedPassword = await bcrypt.hash(password, 10)
        if (!hashedPassword) {
            return res.status(500).json({
                success: false,
                message: "Unable to encrypt your data"
            })
        }

        const imgUrl = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        const userData = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            confirmPassword: hashedPassword,
            role,
            image: imgUrl,
        })

        console.log("Signup successfull : ", userData)

        return res.status(200).json({
            success: true,
            message: "Signup successfull",
            data: userData
        })

    } catch (err) {
        console.log("Signup error : ", err)
        return res.status(500).json({
            success: false,
            message: "Unable signup"
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Fill data properly"
            })
        }

        // Email validation
        const isEmail = await User.findOne({ email: email })
        if (!isEmail) {
            return res.status(409).json({
                success: false,
                message: "User not found "
            })
        }

        if (bcrypt.compare(password, isEmail.password)) {

            // JWT token creation 
            const payload = {
                id: isEmail._id,
                password: isEmail.password,
                role: isEmail.role
            }

            const token = jwt.sign(payload, process.env.PRIVATE_KEY)
            const options = {
                expiresIn: 3 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            }

            return res.cookie('token', token).status(200).json({
                success: true,
                message: "Login successfull",
                data: {
                    token:token,
                    firstName:isEmail.firstName,
                    lastName:isEmail.lastName,
                    role:isEmail.role,
                    image:isEmail.image,
                    email:isEmail.email
                }
            })
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Wrong password"
            })
        }
    } catch (err) {
        console.log("Login Error : ", err)
        return res.status(401).json({
            success: false,
            message: "Unable to login"
        })
    }
}