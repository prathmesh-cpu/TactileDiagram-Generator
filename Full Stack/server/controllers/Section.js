const Section = require('../models/Section')
const Course = require('../models/Course')
const User = require('../models/User')
const { default: mongoose } = require('mongoose')
exports.creatseSection = async (req, res) => {
    try {
        const { sectionName, description, courseId } = req.body
        if (!sectionName || !courseId || !description) {
            res.status(400).json({
                success: false,
                message: 'Some fields are empty'
            })
        }

        // Db entry 
        const sectionData = await Section.create({ sectionName, description })

        // Updating course data 

        const courseData = await Course.findOneAndUpdate({ _id: courseId }, {
            $push: {
                courseContent: sectionData._id
            }
        })

        // return response 
        return res.status(200).json({
            success: true,
            message: "Section created sucessfully"
        })
    } catch (err) {
        console.log('Unable to create section : ',err)
        return res.status(500).json({
            success: false,
            message: "Unable to create section"
        })
    }

}

exports.updateSection = async (req, res) => {
    try {
        const { sectionId, sectionName , description} = req.body

        if (!sectionName || !sectionId || !description) {
            res.status(400).json({
                success: false,
                message: 'Some fields are empty'
            })
        }

        // Db entry 
        const sectionData = await Section.findOneAndUpdate({ _id: sectionId }, {
            sectionName: sectionName,
            description:description
        })

        // return response 

        return res.status(200).json({
            success: true,
            message: "Section updated sucessfully"
        })
    } catch (err) {
        console.log('Unable to update section:',err)
        return res.status(500).json({
            success: true,
            message: "Unable to update section"
        })
    }
}

exports.deleteSection = async (req, res) => {
    try {
        const { sectionId ,courseId } = req.body

        const insrtuctor = req.payload.id

        if (!sectionId) {
            res.status(400).json({
                success: false,
                message: 'Some fields are empty'
            })
        }

        const sectionData = await Section.findByIdAndDelete(sectionId)

        const update = await Course.findOneAndUpdate({_id:courseId} , 
            {
            $pull:{
                courseContent:sectionId
            }
        },{new:true})

        return res.status(200).json({
            success: true,
            message: "Section deleted sucessfully",
            data:update
        })
    } catch (err) {
        console.log("Unable to delete section",err)
        return res.status(500).json({
            success: false,
            message: "Unable to delete section"
        })
    }
}