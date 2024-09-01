import { useEffect, useState } from "react";
import Card from "./Card";
import { apiUrl } from "../utils/data";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
// import image from ".././data.png";

const Cards = () => {

    const category = "All";
    const [getCourses, setGetCourses] = useState([])
    const { token } = useSelector(state => state.auth) || JSON.parse(localStorage.getItem("token"))

    useEffect(() => {
        fetchdata()
    }, [])

    const fetchdata = async () => {
        try {
            var toastId = toast.loading("Loading...")
            console.log(token);
            var courses = await axios.get("http://localhost:4000/api/v1/course/getAllCourses", {
                token: `${token}`
            }, {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            })

            setGetCourses(courses.data.data);
            localStorage.setItem("allCourses", JSON.stringify(courses.data.data))
        } catch (err) {
            console.log(err);
        }
        toast.dismiss(toastId)
    }

    const [likedCourses, setLikedCourses] = useState([]);

    if (getCourses.length === 0) {
        return (
            <div className="text-[1.5rem] flex flex-col items-center font-bold text-white">
                {/* <img src={image} alt="" className="w-[120px] saturate-0 grayscale-0 contrast-200" />
                No Data Found! */}
            </div>
        )
    }
    else {
        return (
            <div className="flex flex-wrap justify-center gap-10 mb-4">
                {
                    getCourses.map((course) => {
                        // console.log(course);
                        return (
                            <Card course={course} key={course._id} likedCourses={likedCourses} setLikedCourses={setLikedCourses} />
                        )
                    })
                }
            </div>
        )
    }

    <div>

    </div>
}

export default Cards