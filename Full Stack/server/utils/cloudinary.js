const cloudinary = require('cloudinary').v2
const { cloudinaryConnect } = require('../config/Cloudinary')


exports.cloudinaryUploader = async (file, folder, quality, height) => {
    // Creating option variable
    let options = { folder }
    if (quality) {
        options.quality = quality
    }

    if (height) {
        options.height = height
    }
    options.resource_type = 'auto'

    // Uploading file
    return await cloudinary.uploader.upload(file.tempFilePath, options)

}