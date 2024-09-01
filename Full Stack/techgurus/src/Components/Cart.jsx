import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import EmptyCart from "./EmptyCart";
import axios from "axios";


const Cart = () => {
  const [total , setTotal] = useState(0)
  const {Cart} = useSelector((state) => state);
  console.log("Cart",Cart);
  useEffect(()=>{
    let sum = 0 ;
    for(let i = 0 ; i<Cart.length ; i++){
      sum += Number(Cart[i].price)
    setTotal( sum );
    }
}, [Cart])


const checkoutHandler = async () => {

    const { data: { key } } = await axios.get("http://www.localhost:4000/api/getkey")

    const { data: { order } } = await axios.post("http://localhost:4000/api/checkout", {
    amount:total
})

console.log(order)

    const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Nirman",
        description: "Payment methods for payment",
        image: "https://cdn-icons-png.flaticon.com/512/1019/1019607.png",
        order_id: order.id,
        prefill: {
            name: "Gaurav Kumar",
            email: "gauravpatil7555@gmail.com",
            contact: "9422388735"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#121212"
        }
    };
    const razor = new window.Razorpay(options);
    razor.open();
}



  return (
    <div className="">
      {Cart.length ? (
        <div className="flex w-[73%] h-[82vh] mx-auto mt-6 mb-6">
          <div className=" w-[60%] gap-[2rem] mx-auto  mt-6 mb-6">
            {Cart.map((item) => {
              return <CartItem data={item} />;
            })}
          </div>
          <div className="text-white w-[40%] flex flex-col pt-7 pb-2 justify-between items-start ml-4">
            <div className="flex flex-col w-[100%] gap-[1rem]">
              <div className="flex flex-col items-start justify-start">
                 <div className=" text-green-600 text-md font-bold">Your Cart</div>
                 <div className=" text-green-700 text-4xl font-extrabold">Summary</div>
              </div>
              <div className="text-xl font-bold">Total item : <span>{Cart.length}</span></div>
            </div>
            <div className="flex flex-col w-[100%] gap-[0.6rem] ml-2">
              <div className="text-xl font-bold">Total Amount : <span>{`$${total}`}</span></div>
              <button 
              className="flex  w-[100%] items-center bg-green-700 p-2 rounded-md text-md text-white font-bold justify-center"
              onClick={checkoutHandler}
              >Checkout Now</button>
            </div>
          </div>
        </div>
      ) : (
        <EmptyCart/>
      )}
    </div>
  );
};

export default Cart;
