import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IListFareData, IListSelectFlight} from "../types/flightModel";


const initialState:IListSelectFlight = {
    Status:false,
    ListFlight:[] ,  
    NumberChoose:0,
    Journey:0,
    Matching:false,
}

const chooseFlightSlice = createSlice({
    name :'chooseFlightSlice',
    initialState,
    reducers:{
        handleNumberChoose:(state,action:PayloadAction<number>)=>{
            state.NumberChoose = action.payload;
            
        },
        handleChooseFlight:(state,action:PayloadAction<IListFareData>)=>{
            if(!state.Status){
                const matchingFlight= action.payload.ListOption[0].ListFlight.length > 1 ? true : false ;             
                state.Matching = matchingFlight ; 
                if(matchingFlight){ 
                    state.ListFlight = [action.payload] ; 
                    state.Status = true ; 
                }else{
                    state.ListFlight.push(action.payload) ; 
                    state.Journey = state.Journey===0 ? 1 : 0 ; 
                    if(state.NumberChoose===state.ListFlight.length){
                        state.Status = true ; 
                    }
                }
            }

        },
        handleChangeFlight:(state,action:PayloadAction<number>)=>{
            if(state.Matching){
                state.ListFlight = [] ; 
                state.Status = false ; 
            }else{
                const newListFlight = state.ListFlight.filter(flight=>flight.ListOption[0].ListFlight[0].Leg!==action.payload) ; 
                state.ListFlight = newListFlight ; 
                state.Journey = action.payload ; 
                state.Status = false ; 
            } 
        }
    }
})

export const {handleChooseFlight,handleNumberChoose,handleChangeFlight} = chooseFlightSlice.actions ; 
export default chooseFlightSlice.reducer ; 