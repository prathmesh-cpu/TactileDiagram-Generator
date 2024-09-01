import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FcFlashOn } from "react-icons/fc";
import CourseInformation from "../Components/CourseInformation"
const AddCourse = () => {
  const navigate = useNavigate();


  const tips = [
    "Set the Course Price option or make it free.",
    "Standard size for the course thumbnail is 1024x576.",
    "Video section controls the course overview video.",
    "Course Builder is where you create & organize a course.",
    "Add Topics in the Course Builder section to create lessons, quizzes, and assignments.",
    "Information from the Additional Data section shows up on the course single page.",
    "Make Announcements to notify any important",
    "Notes to all enrolled students at once.",
  ];
  return (
    <div className=" flex items-start px-5 py-5 w-full h-full justify-between mx-5 gap-2 bg-black">
      <div className=" flex flex-col h-full w-[60%] gap-6 ">


       <CourseInformation />

      </div>
      
       {/* ---------------Tips-------- */}
      <div className=" bg-[#161D29]  h-fit  w-[40%]  gap-4 rounded-md tipsBorder p-3 flex flex-col">
        <h1 className=" flex gap-1 items-center text-xl h-fit text-[#F1F2FF] font-inter ">
          <FcFlashOn /> Course Upload Tips{" "}
        </h1>
        <ul className="flex flex-col gap-3">
          {tips.map((element) => (
            <li className=" flex items-center gap-1 text-[12px]  text-[#F1F2FF] font-inter">
              {element}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddCourse;
