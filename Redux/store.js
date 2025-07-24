import { configureStore } from "@reduxjs/toolkit";
import utilReducer from '@/Redux/utilSlice'
import dataReducer from '@/Redux/dataSlice'



export const store = configureStore({
    reducer: {
        util: utilReducer,
        data: dataReducer
    },
    devTools:true
})