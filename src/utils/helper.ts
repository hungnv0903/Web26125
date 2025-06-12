
import ListAirport from '@/api/jsondata/ListAirport.json';
import ListAirline from '@/api/jsondata/ListAirLine.json' ; 
import { INewListSelectFlight } from '@/types/contactModel';
import { GroupFlightValue} from '@/types/flightConfirmModel';

export function AirportInfo(airportCode:string){
    return ListAirport.find(air=>air.AirportCode===airportCode)
}
export function AirlineInfo(airportCode:string){
    return ListAirline.find(air=>air.Code===airportCode)
}
export function removeVietnameseTones(str:string){

    if (!str) return "";
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Bỏ dấu
    str = str.replace(/đ/g, "d").replace(/Đ/g, "D");             // đ -> d
    str = str.replace(/[^a-zA-Z0-9\s]/g, "");                    // Loại ký tự đặc biệt, giữ khoảng trắng
    return str;
}

export function minutesToHours(minutes:number) {
  if (typeof minutes !== 'number' || minutes < 0) {
      return `0h : 0m` ; 
  }
  return `${Math.floor(minutes/60)}h : ${minutes%60}m` ; 
}

export const optionTransit = [
    { label: 'Direct', value: 0 },
    { label: '1 Transit(s)', value: 1 },
    { label: '+2 transits', value: 2 },
  ];
  
export  const optionTimeFlight = [
    { ID: 1, Label: 'Night to Morning', Time: [0, 6] },
    { ID: 2, Label: 'Morning to Noon', Time: [6, 12] },
    { ID: 3, Label: 'Noon to Evening', Time: [12, 18] },
    { ID: 4, Label: 'Evening to Night', Time: [18, 24] },
  ];

export const ServiceType = [
    {
        Title:"Select your baggage",
        Description:"You can bring 20 kg baggage per passenger. Need more? Tap here.",
        Action:"Bag",
    },
    {
        Title:"Select additional services for your trip",
        Description:"You can bring 20 kg baggage per passenger. Need more? Tap here.",
        Action:"Ancil",
    },
    {
        Title:"Select your seat ",
        Description:"You can bring 20 kg baggage per passenger. Need more? Tap here.",
        Action:"Seat",
    }
  ];

export const ConvertMinutes = (minutes: number): Date => new Date(new Date().getTime() + minutes * 60 * 1000);

export function groupListFlightValue(flightData:INewListSelectFlight[]){
  const mapFlightData = new Map() ; 
  flightData.forEach(item=> {
    const key = item.System ;
    const flights = item.ListFlight.map(fl=>fl.FlightValue) ; 
    if(!mapFlightData.has(key)){
      mapFlightData.set(key,flights) ; 
    }else{
      mapFlightData.get(key).push(...flights) ; 
    }

  });
  const result:GroupFlightValue[] = Array.from(mapFlightData).map(([key,value])=>({System:key,ListFlightValue:[...value]})) ;  
  return result ;
}

export function getOrderIdentify() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
    return `${day}${month}${year}${hours}${minutes}${seconds}${milliseconds}`;
}