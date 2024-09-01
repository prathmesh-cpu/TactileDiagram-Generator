const User = require('../models/User')
const Course = require('../models/Course')
const { cloudinaryUploader } = require('../utils/cloudinary')
require('dotenv').config()


exports.createCourse = async (req, res) => {
    try {
        // Fetching Data
        const {
            courseName,
            courseDescription,
            price,
        } = req.body

        // Fetching files
        const thumbnail = req.files.thumbnail
        console.log(thumbnail);
        // Validation of data 
        if (!courseName || !courseDescription   || !price || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: "Fill all fileds please",
            })
        }

        // Fetching instructor id
        const instructor = req.payload.id

        // Validating instructor 
        const instructorData = await User.findById(instructor)

        if (!instructorData) {
            return res.status(400).json({
                success: false,
                message: "Invalid instructor"
            })
        }

    

        //Uploading thumbnail to cloudinary
        const imageData = await cloudinaryUploader(thumbnail, process.env.CLOUDINARY_FOLDER)
        if (!imageData) {
            return res.status(400).json({
                success: false,
                message: "Unable to upload image"
            })
        }
        const url = imageData.secure_url

        // Database entry
        const courseEntry = await Course.create({
            courseName,
            courseDescription,
            instructor: instructor,
            thumbnail: url,
            price,

        })

        // User update
        const userUpdate = await User.findOneAndUpdate({ _id: instructor },
            {
                $push: {
                    courses: courseEntry._id
                }
            })

        // Response 
        return res.status(200).json({
            success: true,
            message: "Course created sucessfully",
            data: courseEntry
        })
    } catch (err) {
        console.log("Unable to create course:", err)
        return res.status(200).json({
            success: false,
            message: "Unable to create course"
        })
    }
}

exports.getAllCourses = async (req, res) => {
    try {
        // Fetching all courses 

        const allCourses = await Course.find({});

        return res.status(200).json({
            success: true,
            message: "Courses fetched sucessfully",
            data: allCourses
        })
    } catch (err) {
        return res.status(200).json({
            success: true,
            message: "Unable to fetch"
        })
    }
}

exports.getCourseDetails = async (req, res) => {
    try {
        //Fetchind data 
        const { courseId } = req.body
        // Fetching all courses 
        const courseData = await Course.findById(courseId).populate({
            path: "instructor",
            populate: {
                path: "profile"
            }
        })
            .populate(
                {
                    path: "courseContent",
                    populate: {
                        path: "subSection"
                    }
                }
            )
            .populate({
                path: "ratingAndReveiws",
            })
            .populate({
                path: "category",
            })
            .populate({
                path: "studentsEnrolled"
            })
            .exec()
        return res.status(200).json({
            success: true,
            message: "Course fetched sucessfully",
            data: courseData
        })
    } catch (err) {
        console.log("Unable to fetch course error", err)
        return res.status(500).json({
            success: false,
            message: "Unable to fetch course"
        })
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Fill all fileds please"
            })
        }
        const courseData = await Course.findById(courseId)
        if (!courseData) {
            return res.status(400).json({
                success: false,
                message: "Course doesn't exist"
            })
        }
        await Course.findByIdAndDelete(courseId)

        const userData = await User.findOneAndUpdate(
            {
                _id: courseData.instructor
            },
            {
                $pull: {
                    courses: courseId
                }
            })

        const categoryData = await Category.findOneAndUpdate(
            {
                _id: courseData.category
            },
            {
                $pull: {
                    courses: courseId
                }
            })

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        })
    } catch (err) {
        console.log("Unable to delete course : ", err);
        return res.status(500).json({
            success: false,
            message: "Unable to delete course"
        })
    }
}
