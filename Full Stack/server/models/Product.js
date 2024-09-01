const mongoose = require('mongoose')
const courseSchema = mongoose.Schema(
    {
        productName: {
            type: String,
            trim: true,
        },
        productDescription: {
            type: String,
            trim: true,
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        ratingAndReveiws: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "RatingAndReviews"
            }
        ],
        image1: 
         {
            type: String,
            trim: true,
         }
        ,
        image2: 
         {
            type: String,
            trim: true,
         },
         image3: 
         {
            type: String,
            trim: true,
         },
        thumbnail: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
        },
    }
)

module.exports = mongoose.model("Course", courseSchema)