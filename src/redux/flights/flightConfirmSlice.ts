import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FlightConfirm} from "@/types/flightConfirmModel";


interface initialStateProp  {
    Status:boolean ; 
    ListFlightConfirm:(FlightConfirm | null)[] ; 
}
const initialState:initialStateProp = {
    Status:false,
    ListFlightConfirm:[],
}



const flightConfirmSlice = createSlice({
    name:'flightConfirm',
    initialState,
    reducers:{
        handleFlightConfirm:(state,action:PayloadAction<(FlightConfirm| null)[]>)=>{ 
            state.ListFlightConfirm = action.payload ; 
            state.Status = true ; 
        },
        handleClearFlightConfirm:(state)=>{
            Object.assign(state, initialState);
        }
    },
})

export const {handleFlightConfirm , handleClearFlightConfirm} = flightConfirmSlice.actions ; 
export default flightConfirmSlice.reducer ; 