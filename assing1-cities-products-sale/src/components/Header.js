import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { toggleCityClicks, toggleProductClicks, toggleRefreshClick } from "../utils/headerSlice";

const Header = () => {
    const navigate = useNavigate();
    const header = useSelector(store => store.header);
    const dispatch = useDispatch();

    
    // const handleCityClick = () =>{
    //     dispatch(toggleCityClicks());
    //     navigate("/cities");
    // }

   
    
    const handleRefreshClick = () =>{
        dispatch(toggleRefreshClick());
        navigate("/")
    }
    return (
        <div className="px-8 w-full py-4 bg-gradient-to-b from-black to-gray-800 text-white z-10 fixed flex justify-center ">
            <div className="flex justify-between items-center w-full max-w-4xl px-4">
                <h1 className="bg-blue-800 hover:bg-blue-600  text-xl border rounded-sm px-4 py-1 font-bold" >{`City Visited : ${header.cityClick}`}</h1>
                <h1 className="bg-gray-500 hover:bg-gray-600  text-xl border rounded-sm px-4 py-1 font-bold" >{`Product Visited : ${header.productClicks}`}</h1>
                <button 
                    onClick={handleRefreshClick} 
                    className="bg-red-500 hover:bg-red-600 border rounded-md text-white m-2 px-4 py-2 transition duration-300 ease-in-out"
                >
                    Refresh
                </button>
            </div>
        </div>
    );
}

export default Header;
