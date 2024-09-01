import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from "react-router-dom";

const ProductInfo = () => {
    const { id } = useParams()
    useEffect(() => {
        const alldata = JSON.parse(localStorage.getItem("allCourses"))
        const data = alldata.filter((element) => {
            return element._id === id
        })
        console.log(data);
    }, [])
    return (
        <div className='flex text-white' >
            <div>
                <div>
                    <h1>The Complete 2024 Web Development Bootcamp</h1>
                    <p>Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps</p>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default ProductInfo