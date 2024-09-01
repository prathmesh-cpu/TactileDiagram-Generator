import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
const EmptyCart = () => {
    let navigate = useNavigate()
  return (
    <div className="w-[100%] flex h-[90vh] text-white justify-center items-center flex-col gap-1">
        <div className="text-xl font-bold">
            Cart is Empty
        </div>
       
            <button className="text-md text-white bg-green-700 p-2 flex justify-center items-center rounded-md"
            onClick={()=> navigate('/dashboard/products')}>
                Shop Now
            </button>
    </div>
  )
}

export default EmptyCart