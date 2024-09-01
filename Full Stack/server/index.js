
const {config} = require('dotenv')
config({ path: "./config/config.env" });

// getting all routes
const {instance} = require('./config/Razorpay')
// Corrected import statement
const paymentRoutes = require('./Routes/paymentRoutes');
const CourseRoutes = require('./Routes/CourseRoutes')
const AuthRoutes = require("./Routes/AuthRoutes")

// All requirements 
const cors = require('cors');
require('dotenv').config()
var cookieParser = require('cookie-parser')
const {connectCloudinary} = require('./config/Cloudinary');
const {dbConnection} = require('./config/Database');

// Instantiate server
const express = require('express');
const fileupload = require('express-fileupload');
const app = express();



// Middlewares 
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}
))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser());


app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
// Mounting
app.use('/api/v1/course',CourseRoutes);
app.use('/api/v1/auth',AuthRoutes);
app.use("/api", paymentRoutes);


// Connection
connectCloudinary();
dbConnection();

// App ko listen karvade ?
// Sun rahe ho app bhai 
const PORT = process.env.PORT;

app.listen(PORT , ()=>{
    console.log(`App listening at ${PORT}`)
})

// Default request
app.get("/api/getkey", (req, res) =>
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
  );


app.get('/' , (req,res)=>{
   res.send("<h1>Nirman - Pratik Shah</h1>")
})