import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { remove } from "../slices/cartSlice";

const CartItem = ({ data }) => {
    let description = data.courseDescription.substring(0, 100);
    let dispatch = useDispatch()
    function deleteItem() {
        dispatch(remove(data._id))
    }
    return (
        <div className="flex w-[100%] gap-[2rem] border-b-2 pb-5 pt-5 text-white">
            <div><img src={data.thumbnail} alt="" className="h-[10rem] w-[10rem]" /></div>
            <div className="w-[50%] flex flex-col gap-[1rem] justify-centre items-start">
                <div className="text-md font-bold">{data.courseName}</div>
                <div className="text-sm font-light opacity-[70%]">{`${description}....`}</div>
                <div className="flex w-[100%] gap-[50%] items-center">
                    <div className="ext-md text-[#3dc43d] font-extrabold">{`$${data.price}`}</div>
                    <div className="bg-red-400 flex justify-center items-center rounded-[100%] h-max p-1 cursor-pointer" onClick={deleteItem}>{<MdDelete />}</div>
                </div>
            </div>

        </div>
    )
};

export default CartItem;
