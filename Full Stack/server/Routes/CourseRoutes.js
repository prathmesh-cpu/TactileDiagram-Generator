


const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    deleteCourse
} = require('../controllers/Courses')


// Section 
const {
    creatseSection,
    updateSection,
    deleteSection
} = require('../controllers/Section')

// Subsection
const {
    createSubSection,
    editSubSection,
    deleteSubSection
} = require('../controllers/Subsection')

// Authentication middleware
const { auth, isSeller } = require('../middlewares/auth')

const express = require('express')
const routes = express.Router()

// Insrtuctor controlls

// Create course Routes
routes.post('/createCourse', auth, isSeller, createCourse);
routes.get('/getAllCourses', getAllCourses);
routes.get('/getCourseDetails', auth, isSeller, getCourseDetails);
routes.delete('/deleteCourse', auth, isSeller, deleteCourse)

// Section Routes
routes.post('/createSection', auth, isSeller, creatseSection);
routes.put('/updateSection', auth, isSeller, updateSection);
routes.delete('/deleteSection', auth, isSeller, deleteSection);

// SubSection Routes
routes.post('/createSubSection', auth, isSeller, createSubSection);
routes.put('/editSubSection', auth, isSeller, editSubSection);
routes.delete('/deleteSubSection', auth, isSeller, deleteSubSection);






module.exports = routes 