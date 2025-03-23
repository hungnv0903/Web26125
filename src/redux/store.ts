import { combineReducers, configureStore } from "@reduxjs/toolkit";
import searchFormSlice from './searchFormSlice';
import searchFlightSlice from './searchFlightsSlice';
import chooseFlightSlice from './chooseFlightSlice' ; 

const rootReducer = combineReducers({
    searchFormReducer: searchFormSlice,
    searchFlightReducer:searchFlightSlice,
    chooseFlightReducer:chooseFlightSlice,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware(),
        
})

 
export type RootState = ReturnType<typeof store.getState>; //RootState chứa tất cả các state của Store ; 
export type AppDispatch = typeof store.dispatch; //Việc sử dụng AppDispatch giải quyết vấn đề cho dispath
export default store;
