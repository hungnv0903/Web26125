import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {IDataCollectionFilter} from "../types/filterModel";


const initialState:IDataCollectionFilter= {
    ListAirline:[],
    Duration:{
        DurationMin:0,
        DurationMax:60,
    },
    PricePassenger:{
        PricePassengerMin:0,
        PricePassengerMax:100000,
    }

} 

const dataCollectionFilterSlice = createSlice({
    name:"airlineSlice",
    initialState,
    reducers: {
        handleDataCollectionFilter:(state,action:PayloadAction<IDataCollectionFilter>)=>{
            state.ListAirline = action.payload.ListAirline ;  
            state.Duration = action.payload.Duration ; 
            state.PricePassenger = action.payload.PricePassenger ; 
        },
    }
})

export const {handleDataCollectionFilter} = dataCollectionFilterSlice.actions ; 
export default dataCollectionFilterSlice.reducer ; 