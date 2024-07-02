import { createSlice } from "@reduxjs/toolkit";
 
const citySlice = createSlice({
    name:"cities",
    initialState:{
        listOfCities :[]
    },
    reducers:{
        addCityList:(state,action)=>{
            state.listOfCities =action.payload
        }
    }
});

export const {addCityList} = citySlice.actions;
export default citySlice.reducer;