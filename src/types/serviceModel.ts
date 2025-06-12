interface IColoumnSeat {
    ColumnIndex: number,
    ColumnCode: string,
    ColumnType: string,
    Characteristics: string[]
}
interface ISeat {
    SeatValue: string,
    SeatText: string,
    SeatPrice: 0,
    SeatCurrency: string,
    Route: string,
    Description: string[]
}
interface ICabin {
        FirstRow: string,
        LastRow: string,
        CabinClass: string,
        ListColumn: IColoumnSeat[],
        ListRow: {
            RowNumber:string,
            ListSeat:ISeat
        }[]
        
}

export interface IGetServiceFlight {
    Action:string ; 
    DataGetService:{
        System:string ; 
        FlightValue:string ; 
    }
} 

export interface IBaggage {
    BaggageValue: string ; 
    BaggageText: string ; 
    BaggagePrice: number ; 
    BaggageCurrency: string ; 
    DepartureDate: string ; 
    Route: string ; 
}

export interface IAncillary {
    AncillaryValue: string ;
    AncillaryText: string ;
    AncillaryPrice: number ; 
    AncillaryCurrency: string ;
    DepartureDate: string ;
    Route: string ;
 

}

export interface ISeatMap {
      Aircraft: string,
      FlightNumber: string,
      ListCabin: ICabin[]
} 

export interface IResponseBaggage {  
  ListBaggage:IBaggage[] ; 
  Status: boolean ; 
  ErrorCode: string ; 
  Message: string ; 
  TotalSeconds: number ; 

}

export interface IResponseAncillary {
    ListAncillary: IAncillary[] ;  
    Status: boolean ; 
    ErrorCode: string ; 
    Message: string ; 
    TotalSeconds: number ; 
}

export interface IResponseSeatMap {
  ListFlightSeat: ISeatMap[]  ; 
  Status: boolean ; 
  ErrorCode: string ; 
  Message: string ; 
  TotalSeconds: number ; 

}

