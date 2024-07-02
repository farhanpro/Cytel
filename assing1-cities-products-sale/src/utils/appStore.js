import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "./headerSlice";
import citySlice from "./citiesSlice";


const appStore = configureStore({
    reducer:{
        header : headerSlice,
        cities:citySlice,
    },
});

export default appStore;