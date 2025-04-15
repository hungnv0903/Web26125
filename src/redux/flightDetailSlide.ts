import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IListFareData } from "../types/flightModel";

interface initialStateProp  {
    isOpen:boolean ; 
    Flight: IListFareData | null ; 
}

const initialState:initialStateProp = {
    isOpen:false,
    Flight:null
}
const flightDetailSlice = createSlice({
    name:'flightDetailSlice',
    initialState,
    reducers:{
        handleFlightDetail:(state,action:PayloadAction<IListFareData | null>)=>{
            state.Flight = action.payload ; 
            state.isOpen = action.payload ? true : false ; 
        }
    }
})

export const {handleFlightDetail} = flightDetailSlice.actions ; 
export default flightDetailSlice.reducer ; 