
import ListAirport from '../api/jsondata/ListAirport.json';
import ListAirline from '../api/jsondata/ListAirLine.json' ; 

export function AirportInfo(airportCode:string){
    return ListAirport.find(air=>air.AirportCode===airportCode)
}
export function AirlineInfo(airportCode:string){
    return ListAirline.find(air=>air.Code===airportCode)
}
export function removeVietnameseTones(str:string){
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Loại bỏ dấu
    str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D'); // Chuyển đổi "đ" thành "d"
    str = str.replace(/[^a-zA-Z0-9\s]/g, ''); // Loại bỏ các ký tự đặc biệt
    str = str.replace(/\s+/g, ' ').trim(); // Xóa khoảng trắng thừa
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
