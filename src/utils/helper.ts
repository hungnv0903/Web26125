
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

