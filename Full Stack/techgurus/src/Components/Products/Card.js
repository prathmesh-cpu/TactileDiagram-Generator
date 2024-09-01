import { IoAddCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { add } from "../../slices/cartSlice";
import toast from "react-hot-toast";
// import { toast } from "react-toastify";

const Card = ({ course }) => {
    const { thumbnail, courseName, courseDescription, price, _id } = course;
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div className="bg-bgDark w-[300px] rounded-md overflow-hidden">
            <div className="relative cursor-pointer" onClick={() => {
                navigate(`/dashboard/product/${_id}`);
            }}>
                <img className="w-[300px] h-[200px]" src={thumbnail} />
            </div>
            <div className="p-4 flex flex-col">
                <p className="text-white text-lg font-semibold leading-6">{courseName}</p>
                <p className="mt-2 text-slate-300">
                    {`${courseDescription.substring(0, 70)}...`}
                </p>
                <div className="flex justify-between pt-3">
                    <p className="text-white font-bold">₹ {price}</p>
                    <p className="text-white font-bold">⭐ 4.5</p>
                </div>
                <div className="flex pt-3 justify-end">
                    <button className="text-white flex items-center gap-1 bg-bgDark2 px-3 py-1 rounded-md" 
                    onClick={()=>{
                        dispatch(add(course))
                        toast.success("Added to cart")
                    }}
                    ><IoAddCircle className=" text-xl" /> Add</button>
                </div>
            </div>
        </div>
    )
}

export default Card