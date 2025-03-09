
export type DepartDateProp = string[] | null ; 

export interface PassengerProp  {
    Adt:number ; 
    Chd:number ; 
    Inf:number ; 
}

export interface SearchDataProps {
    Journey:boolean ; 
    StartPoint:string ;
    EndPoint:string ; 
    DepartDate:DepartDateProp ; 
    Passenger:PassengerProp ; 
}

export interface IListFlightSearch {
    "Leg":number ; 
    "StartPoint":string ; 
    "EndPoint":string ; 
    "DepartDate":string ; 
}
export interface ISearchFlight {
    "Adt":number ; 
    "Chd":number ;
    "Inf":number ; 
    "ListFlight": IListFlightSearch[] | null ; 
}

export interface IPostFlightData extends ISearchFlight {
    System: string;
}

export type TypeFlight = {
    returnTrip:boolean ; 
    domestic:boolean;
}

export interface ISearchData {
    "flightSearch":ISearchFlight;
    "systems":string[];
}