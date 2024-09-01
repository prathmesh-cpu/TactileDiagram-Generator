const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const { cloudinaryUploader } = require("../utils/cloudinary")
require('dotenv').config()

exports.createSubSection = async (req, res) => {
    try {
        const { title,  sectionId } = req.body

        const video = req.files.videoFile

        if (!title || !sectionId || !video) {
            res.status(400).json({
                success: false,
                message: 'Some fields are empty'
            })
        }

        const uploadDetails = await cloudinaryUploader(video, process.env.CLOUDINARY_FOLDER)

        const subsectionData = await SubSection.create({ title, videoUrl: uploadDetails.secure_url })

        const updateSection = await Section.findByIdAndUpdate(sectionId, {
            $push: {
                subSection: subsectionData._id
            }
        })


        return res.status(200).json({
            success: true,
            message: "Subsection created",
            data: subsectionData
        })
    } catch (err) {
        console.log('Unable to create subsection', err)
        return res.status(500).json({
            success: false,
            message: "Unable to create subsection"
        })
    }
}

exports.editSubSection = async (req, res) => {
    try {
        const { title = "", duration = "", description = "", subSectionId } = req.body

        if (title || duration || description) {
            const updatedsubSection = await SubSection.findByIdAndUpdate(subSectionId, {
                title: title,
                duration: duration,
                description: description
            }, { new: true })

            return res.status(200).json({
                success: true,
                message: "Subsection updated sucessfully"
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "Nothing to update"
            })
        }
    } catch (err) {
        console.log('Unable to update subsection', err)
        return res.status(500).json({
            success: false,
            message: "Unable to update subsection"
        })
    }

}


exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body
        console.log("subSectionId", subSectionId);

        if (!subSectionId) {
            return res.status(400).json({
                success: false,
                message: "Nothing to delete"
            })
        }

        const deletesubSection = await SubSection.findByIdAndDelete(subSectionId)

        const sectionData = await Section.findOneAndUpdate({ _id: sectionId }, {
            $pull: {
                subSection: subSectionId
            }
        })

        return res.status(500).json({
            success: true,
            message: "Subsection deleted"
        })


    } catch (err) {
        console.log('Unable to delete subsection', err)
        return res.status(500).json({
            success: false,
            message: "Unable to delete subsection"
        })
    }

}

