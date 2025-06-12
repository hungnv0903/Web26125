import { IContactForm, INewListSelectFlight } from "./contactModel";


export interface IConfirmPrice {
    ListFlightValue:string[] ; 
    System:string;
}
export type ConfirmPriceQHA = IConfirmPrice & IContactForm  ; 
    

export interface IResponseConfirmPice {
    "Session": string ; 
    "TotalPrice": number ; 
    "Currency": string ; 
    "Status": boolean ; 
    "ErrorCode": string ; 
    "Message": string ; 
    "TotalSeconds": number ; 
}

export interface IResponseConfirmPriceQHA {
    
  "NewFlightValue": string ; 
  "TotalPrice": number ; 
  "Status": boolean ; 
  "ErrorCode": string ; 
  "Message": string ; 
  "TotalSeconds": number ; 

}

export type NewResponseFlightConfirm = {
  Session:string , 
  TotalPrice:number , 
}

export interface FlightConfirm {
    ListFlightConfirm:INewListSelectFlight[]
    Confirm: NewResponseFlightConfirm[] | NewResponseFlightConfirm | null
}

export type GroupFlightValue = {
  System:string ; 
  ListFlightValue:string [] ; 
}