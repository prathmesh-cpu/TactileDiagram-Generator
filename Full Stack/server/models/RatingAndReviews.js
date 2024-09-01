const mongoose = require('mongoose')
const ratingAndReviewsSchema = mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        course:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        },
        ratings: {
            type:Number,
        },
        reviews:{
            type:String,
            trim:true
        }
    }
)

module.exports = mongoose.model("RatingAndReviews", ratingAndReviewsSchema)