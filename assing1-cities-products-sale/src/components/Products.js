import { useState, useEffect } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Header from "./Header"; // Assuming you have this component
import { toggleCityClicks } from '../utils/headerSlice';

const Products = () => {
    const cities = useSelector(store => store.cities);
    const [productsData, setProductsData] = useState([]);
    const { productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(productId);

    const cookData = async () => {
        const productPromises = cities.listOfCities.map(async (city) => {
            const response = await fetch(`https://assessments.reliscore.com/api/sales/${city}/`);
            const data = await response.json();
            return { city, data: data.data }; // Store the city and its data
        });
        const results = await Promise.all(productPromises);
        return results;
    }

    const handleCityClick = (city) =>{
        dispatch(toggleCityClicks());
        navigate(`/cities/${city}`);
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await cookData();
            console.log(data); // Log the fetched data
            const filteredData = data.map(productData => ({
                city: productData.city,
                data: { [productId]: productData.data[productId] }
            })).filter(productData => productData.data[productId] !== undefined);
            setProductsData(filteredData); // Set the state with filtered data
        };
        fetchData();
    }, [productId, cities]);

    return (
        <div>
            <Header />
            <div className="pt-24 px-8">
           
                <div className="flex flex-wrap justify-start items-center mb-4">
                    <button 
                    className="bg-blue-700 text-white rounded-lg px-4 py-2 text-xl hover:bg-blue-600 transition duration-300 ease-in-out" 
                    onClick={() => { navigate('/') }}>
                    ⬅️ Back
                    </button>
                    <h1 className="text-3xl font-extrabold mx-4 text-gray-900">
                    {`Browse product for ProductID : ${productId}`}
                    </h1>
                </div>


                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                            
                                <th className="py-2 px-4">City</th>
                                <th className="py-2 px-4">Product Name</th>
                                <th className="py-2 px-4">Quantity/Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsData.map((productData, index) => (
                                <tr key={index} className="text-center border-b">

                                    
                                    <td className="py-2 px-4"><button className="py-2 px-4 text-white bg-blue-950 border rounded-2xl" onClick={()=>handleCityClick(productData.city)}>{productData.city}</button></td>
                                    <td className="py-2 px-4">{productId}</td>
                                    <td className="py-2 px-4">{productData.data[productId]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Products;
