const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
        },
        password: {
            type: String,
        },
        confirmPassword: {
            type: String,
        },
        role: {
            type: String,
            enum: ['Admin', 'seller', 'customer']
        },
        image: {
            type: String,
            trim:true
        },
        courses:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course"
            }
        ],
        Products:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products"
            }
        ]
    }
)

module.exports = mongoose.model("User",userSchema)