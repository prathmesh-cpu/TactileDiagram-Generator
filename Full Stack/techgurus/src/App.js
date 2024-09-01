import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Home from "./Components/Home.jsx";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import Cards from "./Components/Products/Cards.js";
import ProductInfo from "./Components/Products/ProductInfo.js";
import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Cart from "./Components/Cart.jsx";
import PaymentSuccess from "./Components/PaymentSuccess.jsx";
import Profile from "./pages/Profile.jsx";
import CreateCourse from "./pages/CreateCourse.jsx"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="w-screen bg-richblack-900 flex flex-col ">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<Signup setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route isLoggedIn={isLoggedIn}>
          <Route element={<Dashboard/>}>
            <Route path="/dashboard/cart" element={<Cart />} />
            <Route path="/dashboard/products" element={<Cards />} />
            <Route path="/dashboard/product/:id" element={<ProductInfo />} />
            <Route path="/dashboard/courses" element={<Cards />} />
            <Route path="/dashboard/paymentsuccess" element={<PaymentSuccess />} />
            <Route path="/dashboard/addProducts" element={<CreateCourse />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
