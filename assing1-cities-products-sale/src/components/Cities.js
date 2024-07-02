import Header from "./Header";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { toggleProductClicks } from "../utils/headerSlice";
import { useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const Cities =  () => {
    const [products, setProducts] = useState([]);
    const {cityname} =  useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

   
    const handleProductClicks = (productName) =>{
        dispatch(toggleProductClicks());
        navigate(`/products/${productName}`)
    }

    const fetchProducts = async () => {
        const response = await fetch(`https://assessments.reliscore.com/api/sales/${cityname}/`);
        const data = await response.json();
        setProducts(Object.entries(data.data)); // Convert object to array of key-value pairs
       
    };

    useEffect(() => {
        fetchProducts();
    }, [cityname]);

    return (
        <div>
            <Header />
            <div className="pt-24 px-8">
                <h1 className="text-2xl font-bold mb-4">{`Browse Products in ${cityname}`}</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-2 px-4">Product Name</th>
                                <th className="py-2 px-4">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(([productName, productValue], index) => (
                                <tr key={index} className="text-center border-b">
                                <td className="py-2 px-4">
                                <button className="py-2 px-4 text-white font-semibold bg-blue-950 border rounded-2xl" onClick={()=>handleProductClicks(productName)}>{productName}</button>
                                </td>
                                    <td className="py-2 px-4">{productValue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Cities;
