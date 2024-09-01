const mongoose = require('mongoose')
const courseSchema = mongoose.Schema(
    {
        courseName: {
            type: String,
            trim: true,
        },
        courseDescription: {
            type: String,
            trim: true,
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        
        courseContent: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Section"
            }
        ],
        ratingAndReveiws: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "RatingAndReviews"
            }
        ],
        thumbnail: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
        },
        studentsEnrolled: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
    }
)

module.exports = mongoose.model("Course", courseSchema)