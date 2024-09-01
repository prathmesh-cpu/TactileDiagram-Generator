import React, { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { useForm } from "react-hook-form";
import InputThumbnail from "./InputThumbnail";
import axios from "axios";
import toast from "react-hot-toast";

const CourseInformation = () => {
  const [thumbnail, setThumbnail] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


 

  async function createCourse(data) {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzM3YzU1NjFhMWI0M2Y5OTFiY2YwMCIsInBhc3N3b3JkIjoiJDJiJDEwJC9FUHpOMml0elVkWU02RFRtWXBsb09NSjVCcllETEZETWQzSzhmN2lQR3Uwblkxenc5bHlXIiwicm9sZSI6IlNlbGxlciIsImlhdCI6MTcxNDY2OTQ5NH0.ocXZ4kLNwfimFovzYU7C6KqPNimxtLK-aIwm6dES_3c"
    console.log(data)
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseDescription);
    formData.append("price", data.coursePrice);
    formData.append("thumbnail", thumbnail);
    formData.append("token",token)
    try{
      const res = await axios.post(`http://localhost:4000/api/v1/course/createCourse`,formData,
      {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`
      }
    )

      console.log(res)
      localStorage.setItem("courseData",JSON.stringify(res))
    }catch(err){
      console.log("Create course error",err);
    }
  }
  return (
    <form
      className="w-full flex flex-col gap-3 items-center "
      onSubmit={handleSubmit(createCourse)}
    >
      <div className="w-[100%] relative right-6  flex-col  profileBorder  border-richblack-700 bg-richblack-800 rounded-lg p-[24px] flex gap-4 items-center">
        <div className="mb-2 mt-2 flex flex-col gap-3 items-start w-full">
          <div className="text-[#F1F2FF] text-md ml-1">
            Course Title <sup className="text-[#EF476F] text-md ">*</sup>
          </div>
          <input
            type="text"
            id="name"
            name="firstName"
            placeholder="Enter Course Title"
            className="w-full bg-[#2C333F] py-2 focus:outline-none px-4  cursor-pointer pr-16 rounded-lg shadow-inset"
            {...register("courseTitle", {
              required: true,
            })}
          />
          {errors.courseTitle && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course title is mandatory
            </span>
          )}
        </div>

        <div className="mb-2 mt-2 flex flex-col gap-3 items-start w-full">
          <div className="text-[#F1F2FF] text-md ml-1">
            Course Description<sup className="text-[#EF476F] text-md ">*</sup>
          </div>
          <textarea
            id="description"
            name="description"
            placeholder="Enter Course Description"
            className="w-full bg-[#2C333F] py-2 focus:outline-none px-4 cursor-pointer pr-16 rounded-lg shadow-inset"
            rows={5} // Set the number of rows
            cols={10} // Set the number of columns
            {...register("courseDescription", {
              required: true,
            })}
          />
          {errors.courseDescription && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course description is mandatory
            </span>
          )}
        </div>

        <div className="mb-2 mt-2 flex flex-col gap-3 items-start w-full relative">
          <div className="text-[#F1F2FF] text-md ml-1">
            Price <sup className="text-[#EF476F] text-md ">*</sup>
          </div>
          <FaRupeeSign className="text-[16px]  mx-1 text-[#585D69] absolute top-12 z-10 " />
          <input
            type="text"
            id="name"
            name="firstName"
            placeholder="Enter Price"
            className="w-full bg-[#2C333F] py-2  focus:outline-none px-6  cursor-pointer pr-16 rounded-lg shadow-inset"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
          />
          {errors.coursePrice && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Price is mandatory
            </span>
          )}
        </div>




        <InputThumbnail
          register={register}
          isVideo={false}
          label={"Course Thumbnail"}
          name={"tumbnail"}
          errors={errors}
          setThumbnail={setThumbnail}
        />

      </div>
      <button className=" bg-[#FFD60A] flex items-center font-bold gap-2 rounded-lg editShadow py-[8px] px-[30px] text-md text-[#000814]">
        Next
      </button>
    </form>
  );
};

export default CourseInformation;
