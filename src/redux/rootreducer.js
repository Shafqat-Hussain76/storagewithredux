import { combineReducers } from "@reduxjs/toolkit";
import { storageReducer } from "./storageslicer";

export const rootReducer = combineReducers({
    metaconnect: storageReducer,
})
