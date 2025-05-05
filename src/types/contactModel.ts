
type ContactInfo = {
    GivenName: string;
    Phone: string;
    Email: string;
    Address?:string;
  };

type PassengerInfo = {
    Gender:boolean ; 
    FirstName:string;
    LastName:string;
    Birthday:string;
  }

export type FieldType = {
    Contact:ContactInfo ; 
    ListPassenger: PassengerInfo[] ; 
  }


export  type ListTypePassengerProp = {
    Type:string ; 
    Name:string ; 
    Index:number ; 
  }