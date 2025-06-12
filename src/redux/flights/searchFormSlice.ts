
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ISearchFlight} from '@/types/searchModel';

// import dayjs from 'dayjs';
// const initialDepartdate = dayjs((dayjs().add(1, 'day')).toDate()).format('DDMMYYYY') ; 
// const initialReturnDate = dayjs((dayjs().add(5, 'day')).toDate()).format('DDMMYYYY') ; 

const initialState:ISearchFlight = {
    Adt:1,
    Chd:0,
    Inf:0,
    Domestic:true,
    ListFlight:[] ,   
}

const searchFormSlice = createSlice({
    name:'searchFormSlice',
    initialState,
    reducers:{
        handleSearchForm:(state,action:PayloadAction<ISearchFlight>)=>{
            return action.payload;
        },
        
    }
})

export const { handleSearchForm } = searchFormSlice.actions ; 
export default searchFormSlice.reducer ; 