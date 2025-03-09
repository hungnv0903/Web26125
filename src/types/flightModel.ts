
export interface IListSegment {
    "IndexSegment": number;
    "Id": number;
    "Airline": string;
    "StartPoint": string;
    "EndPoint": string;
    "StartTime": string;
    "EndTime": string;
    "FlightNumber": string;
    "Duration": number;
    "Class": string;
    "FareBasis": string;
    "Cabin": string;
    "CabinName": string;
    "SeatAvl": number ; 
    "Plane": string;
    "StartTerminal": string ; 
    "EndTerminal": string;
    "Status": string;
    "HasStop": boolean ; 
    "StopPoint": string;
    "StopTime": boolean ; 
    "DayChange": boolean ; 
    "StopOvernight": boolean;
    "ChangeStation": boolean;
    "ChangeAirport": boolean;
    "HandBaggage": string;
    "AllowanceBaggage": string;
    "MarketingCarrier": string;
    "OperatingCarrier": string;
}

export interface IListFlight {
    "FlightId": number;
    "Leg": number;
    "Airline": string;
    "Operating": string;
    "StartPoint": string;
    "EndPoint": string;
    "StartDate": string;
    "EndDate": string;
    "FlightNumber": string;
    "StopNum": number;
    "HasDownStop": boolean;
    "Duration": number;
    "NoRefund": boolean;
    "Cabin": string;
    "FareClass": string;
    "Promo": boolean;
    "FlightValue": string;
    "ListSegment":IListSegment[];
}

export interface IListOption {
    "OptionId":number ; 
    "ListFlight":IListFlight[] ; 
}

export interface IListFareData {
    "FareDataId": number;
    "Airline": string;
    "Itinerary": number;
    "Currency": string;
    "System": string;
    "Adt": number; 
    "Chd": number;
    "Inf": number;
    "BaseFareAdt": number;
    "BaseFareChd": number;
    "BaseFareInf": number;
    "DiscountAdt": number;
    "DiscountChd": number;
    "DiscountInf": number;
    "AgentDiscountAdt": number;
    "AgentDiscountChd": number;
    "AgentDiscountInf": number;
    "FareAdt": number;
    "FareChd": number;
    "FareInf": number;
    "TaxAdt": number;
    "TaxChd": number;
    "TaxInf": number;
    "ServiceFeeAdt": number;
    "ServiceFeeChd": number;
    "ServiceFeeInf": number;
    "PriceAdt": number;
    "PriceChd": number;
    "PriceInf": number;
    "TotalFare": number;
    "TotalTax": number;
    "TotalServiceFee": number;
    "TotalAirlineDiscount": number;
    "TotalAgentDiscount": number;
    "TotalPrice": number;
    "ListOption":IListOption[];
}

export interface IResponseAllFlight {
    "Session": string ; 
    "ListFareData":IListFareData[];
    "Status": boolean;
    "ErrorCode": string;
    "Message": string;
    "TotalSeconds": number;
}
