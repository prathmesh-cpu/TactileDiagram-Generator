import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HighlightText from './HighlightText'
import Banner from "../assets/banner.mp4"

const Home = ({ setIsLoggedIn }) => {
  const token = JSON.parse(localStorage.getItem("token"))
  const navigate = useNavigate()
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true)
      navigate("/dashboard/products");
    }
  }, [])
  return (
    <div className="mt-6 relative mx-auto min-h-screen flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
      <div className="text-center text-4xl font-semibold">
        Pioneering New Paths in <HighlightText text={"Visually Impaired"} /> Education
      </div>
      <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-200">
        Empowering visually impaired students and make education accessible for them.
      </div>
      <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
        <video
          className="shadow-[20px_20px_rgba(255,255,255)] w-[1000px]"
          muted
          loop
          autoPlay
        >
          <source src={Banner} type="video/mp4" />
        </video>
      </div>
    </div>
  )
}

export default Home