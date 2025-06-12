import { ContactInfo, PassengerInfo } from "./contactModel";

interface IListPassenger extends PassengerInfo {
    ListPreSeat?: string[] | null;
    ListBaggage?: string[] | null;
    ListService?: string[] | null ; 
}

export interface IBookFlight {
    Contact?:ContactInfo,
    ListPassenger:IListPassenger[] ; 
    ListFlightValue?:string[] ; 
    BookIdentify: string ; 
    VerifySession: string ; 
    System:string ; 
}