import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const Navbar = (props) => {
  const isLoggedIn = props.isLoggedIn;
  const setIsLoggedIn = props.setIsLoggedIn;
  const { Cart } = useSelector((state => state))
  return (
    <div className="flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto">
      <Link to="http://127.0.0.1:8000/">
        <h1 className="text-white text-3xl font-bold">Insight</h1>
      </Link>

      <nav>
        <ul className="flex gap-x-6 text-richblack-100">
          {
            isLoggedIn &&
            <li>
              <NavLink to="/dashboard/products">Products</NavLink>
            </li>
          }
          {
            isLoggedIn &&
            <li>
              <NavLink to="/dashboard/courses">Courses</NavLink>
            </li>
          }
        </ul>
      </nav>

      {/* Button - Login = Signup = Logout = Dashboard  */}

      <div className="flex items-center gap-x-4 text-richblack-100">
        {!isLoggedIn && (
          <Link to="/login">
            <button className="bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">
              Login
            </button>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/signup">
            <button className="bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">
              Sign Up
            </button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/dashboard/cart">
            <p className="text-white flex flex-col">
              {Cart.length !== 0 &&
                <p className="counter text-[0.8rem] font-bold h-[15px] w-[15px] text-black bg-green-400 flex justify-center items-center rounded-[100%]">
                  {Cart.length}
                </p>
              }
              < FaCartArrowDown />
            </p>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/">
            <button
              onClick={() => {
                setIsLoggedIn(false);
                localStorage.clear()
                toast.success("Logout Sucessfully");
              }}
              className="bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700"
            >
              Log Out
            </button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/dashboard">
            <button className="bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">
              Dashboard
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
