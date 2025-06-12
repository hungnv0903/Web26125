import { combineReducers, configureStore } from "@reduxjs/toolkit";
import searchFormSlice from './flights/searchFormSlice';
import searchFlightSlice from './flights/searchFlightsSlice';
import chooseFlightSlice from './flights/chooseFlightSlice' ; 
import flightDetailSlice from './flights/flightDetailSlide' ; 
import filterFlightSlice from "./flights/filterFlightSlice";
import dataCollectionFilterSlice from "./flights/dataCollectionFilterSlice";
import contactFormSlice from "./flights/contactFormSlice";
import flightConfirmSlice from "./flights/flightConfirmSlice";

const flightsReducer = combineReducers({
    searchFormReducer: searchFormSlice,
    searchFlightReducer:searchFlightSlice,
    chooseFlightReducer:chooseFlightSlice,
    flightDetailReducer:flightDetailSlice,
    filterFlightReducer:filterFlightSlice,
    dataCollectionFlightReducer:dataCollectionFilterSlice,
    contactFormReducer:contactFormSlice,
    flightConfirmReducer:flightConfirmSlice,
})

const rootReducer = combineReducers({
    flights: flightsReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware(),
        
})

 
export type RootState = ReturnType<typeof store.getState>; //RootState chứa tất cả các state của Store ; 
export type AppDispatch = typeof store.dispatch; //Việc sử dụng AppDispatch giải quyết vấn đề cho dispath
export default store;
