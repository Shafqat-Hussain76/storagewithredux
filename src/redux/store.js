import { configureStore } from "@reduxjs/toolkit";
import { storageReducer } from "./appreducer";


export const store = configureStore({
    reducer: {
        storage: storageReducer,
        
        
        
        
        

    }
});