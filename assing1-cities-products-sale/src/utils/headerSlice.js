import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
    name:'header',
    initialState:{
        cityClick : 0,
        productClicks:0
    },
    reducers:{
        toggleCityClicks:(state)=>{
            state.cityClick += 1;
        },
        toggleProductClicks:(state)=>{
            state.productClicks +=1;
        },
        toggleRefreshClick :(state) =>{
            state.cityClick = 0;
            state.productClicks = 0;
        }
    }
});

export const {toggleCityClicks,toggleProductClicks,toggleRefreshClick} = headerSlice.actions;
export default headerSlice.reducer;