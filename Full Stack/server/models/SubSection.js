const mongoose = require('mongoose')
const subSectionSchema = mongoose.Schema(
    {
        title: {
            type: String,
            trim:true
        },
        videoUrl: {
            type: String,
            trim:true
        }
    }
)

module.exports = mongoose.model("SubSection", subSectionSchema)