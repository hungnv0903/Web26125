import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IContactForm } from "@/types/contactModel";

const initialState:IContactForm = {
    Contact:{
        SurName: " ",
        GivenName:'',
        Phone:'',
        Email:'',
        Address:'',
    },

    ListPassenger:[],
}

const contactFormSlice = createSlice({
    name:'cohtactFormSlice',
    initialState,
    reducers: {
        handleSaveContactForm:(state,action:PayloadAction<IContactForm>)=>{
            state.Contact = action.payload.Contact ;
            state.ListPassenger = action.payload.ListPassenger 
        },
        handleClearContactForm:(state)=>{
            state.Contact = initialState.Contact ; 
            state.ListPassenger = []; 
        }

    }
})

export const {handleSaveContactForm, handleClearContactForm} = contactFormSlice.actions ; 
export default contactFormSlice.reducer ; 
