
export interface AirlineProp {
    Airline:string ; 
    MinPrice:number ;  
}

export interface DurationProp {
    DurationMin:number ; 
    DurationMax:number ; 
}

export interface PricePassengerProp {
    PricePassengerMin:number  ; 
    PricePassengerMax:number ; 
}

export interface IDataCollectionFilter {
    ListAirline:AirlineProp[],
    Duration:DurationProp,
    PricePassenger:PricePassengerProp,
    
}

export interface IFlightFilter {
    Transit:number[] | unknown [] ; 
    Airline:string[] ; 
    DepartureTime: (number[] | undefined)[];
    ArrivalTime:(number[] | undefined)[]
    Duration:number[] ; 
    PricePassenger:number[] ; 
}

