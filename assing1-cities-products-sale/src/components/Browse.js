import Header from './Header';
import {useState,useEffect} from 'react';
import { toggleCityClicks} from "../utils/headerSlice";
import { useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import { addCityList } from '../utils/citiesSlice';

const Browse = () =>{
    const [cities,setCities] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCityClick = (city) =>{
        dispatch(toggleCityClicks());
        navigate(`/cities/${city}`);
    }

    const fetchCities = async ()=>{
        const response = await fetch("https://assessments.reliscore.com/api/cities/");
        const data  = await response.json();
        setCities(data.data);    
        dispatch(addCityList(data.data));
    };

    useEffect(()=>{fetchCities()},[]);

    return (
        <div>
            <Header />
            <div className="pt-24 px-8">
                <h1 className="text-2xl font-bold mb-4">Browse Cities</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-2">City</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cities.map((city, index) => (
                                <tr key={index} className="text-center border-b bg-slate-600">
                                    <td className="py-2 px-4">
                                    <button className="py-2 px-4 text-white bg-blue-950 border rounded-2xl" onClick={()=>handleCityClick(city)}>{city}</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Browse;