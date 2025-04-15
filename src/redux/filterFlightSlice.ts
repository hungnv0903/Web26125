import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFlightFilter} from "../types/filterModel";

const initialState:IFlightFilter = {
    Airline:[],
    DepartureTime:[],
    ArrivalTime:[],
    Transit:[],
    Duration:[],
    PricePassenger:[],
}

const filterFlightSlice = createSlice({
    name:"filterFlightSlice",
    initialState,
    reducers:{
        handleTransitFilter:(state,action:PayloadAction<number[] | unknown[]>)=>{
            state.Transit = action.payload ; 
        },
        handleDepartureTimeFilter:(state,action:PayloadAction<(number[] | undefined)[]>)=>{
            state.DepartureTime = action.payload ; 
        },
        handleArrivalTimeFilter:(state,action:PayloadAction<(number[] | undefined)[]>)=>{
            state.ArrivalTime = action.payload ; 
        },
        handleAirlineFilter:(state,action:PayloadAction<string[]>)=>{
            state.Airline = action.payload ; 
        },
        handleDurationFilter:(state,action:PayloadAction<[number,number]>)=>{
            state.Duration = action.payload ; 
        },
        handlePricePassengerFilter:(state,action:PayloadAction<[number,number]>)=>{
            state.PricePassenger = action.payload ; 
        },
        handleResetDataFilter:(state)=>{
            Object.assign(state, initialState);
        }

    }
})
export const {
        handleTransitFilter,
        handleDepartureTimeFilter,
        handleArrivalTimeFilter,
        handleAirlineFilter,
        handleDurationFilter,
        handlePricePassengerFilter,
        handleResetDataFilter,
    } = filterFlightSlice.actions ; 

export default filterFlightSlice.reducer ; 