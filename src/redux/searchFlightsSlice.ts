import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IListFareData, IResponseAllFlight } from "../types/flightModel";
import { IPostFlightData, ISearchData } from "../types/searchModel";
import getFlightsApi from "../services/flightService";
import axios from "axios";


interface responseProp {
    isLoading:boolean ; 
    isData:boolean;
    progress:number ; 
    allFlight:IListFareData[];
    error:string;
}

const initialState:responseProp = {
    isLoading:false,
    isData:false,
    progress:0,
    allFlight:[],
    error:"",

}

export const fetchDataFlight = createAsyncThunk(
    'searchFlight',
    async (searchData:ISearchData, {dispatch, rejectWithValue })=>{
        const {flightSearch,systems} = searchData ; 
        try {
            let isLoading = true ; 
            const updateResult = (newResult:IResponseAllFlight)=>{
                dispatch(handleUpdateFlight(newResult)) ; 
            }

            const updateProgress = (completeRequest:number)=>{
                const progress = Math.round((completeRequest/systems.length)*100) ; 
                dispatch(handleLoadingProgress(progress)) ; 
            }

            let completeRequest = 0 ; 
            const arrPromise = systems.map(async (system)=>{
                const postFlightData:IPostFlightData = {...flightSearch,System:system} ; 
                try {
                    const result = await getFlightsApi.search(postFlightData) ; 
                    updateResult(result) ; 
                
                } catch (error) {
                    if (axios.isAxiosError(error) && error.name === "AbortError") {
                        return rejectWithValue("Request was aborted");
                      }
                    throw error ; 

                } finally {
                    completeRequest++ ; 
                    updateProgress(completeRequest) ; 
                }

            })
            await Promise.all(arrPromise)
                .finally(()=>{
                    isLoading =  false ; 
                }) 
            return isLoading ; 
        }catch(error){
            return rejectWithValue(axios.isAxiosError(error) && error.message || "Failed to fetch flights") ; 
        }

    }
)

const searchFlightSlice = createSlice({
    name:"searchFlight",
    initialState,
    reducers:{
        handleUpdateFlight:(state,action:PayloadAction<IResponseAllFlight>)=>{
            if(action.payload.ListFareData){
                state.allFlight.push(...action.payload.ListFareData) ; 
                if(!state.isData && action.payload.ListFareData.length!==0){
                    state.isData = true ; 
                }
            }
        },
        handleLoadingProgress:(state,action:PayloadAction<number>)=>{
            state.progress = action.payload ; 
        },

    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchDataFlight.pending,(state)=>{
                state.isLoading = true ; 
                state.error = '' ; 
            })
            .addCase(fetchDataFlight.fulfilled,(state,action:PayloadAction<boolean>)=>{
                state.isLoading = action.payload ; 
            })
            .addCase(fetchDataFlight.rejected,(state)=>{
                state.isLoading = false ; 
                state.error = "Call failed !" ; 
            })
    }

})

export const {handleUpdateFlight,handleLoadingProgress} = searchFlightSlice.actions ; 
export default searchFlightSlice.reducer ; 