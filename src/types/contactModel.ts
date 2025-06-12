import { IListFlight } from "./flightModel";

export type ContactInfo = {
    SurName: string,
    GivenName: string;
    Phone: string;
    Email: string;
    Address?:string;
  };

export type PassengerInfo = {
    Index:number ; 
    Type:string ; 
    Gender:boolean ; 
    FirstName:string;
    LastName:string;
    Birthday:string;
  }

export type IContactForm = {
    Contact:ContactInfo ; 
    ListPassenger: PassengerInfo[] ; 
  }


export  type ListTypePassengerProp = {
    Type:string ; 
    Name:string ; 
    Index:number ; 
  }

 
export interface INewListSelectFlight {
  System:string;
  ListFlight:IListFlight[] ; 
}