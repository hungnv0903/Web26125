import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ListAirport from '../api/jsondata/ListAirport.json';

export function AirportInfo(airportCode:string){
    return ListAirport.find(air=>air.AirportCode===airportCode)
}
export function removeVietnameseTones(str:string){
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Loại bỏ dấu
    str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D'); // Chuyển đổi "đ" thành "d"
    str = str.replace(/[^a-zA-Z0-9\s]/g, ''); // Loại bỏ các ký tự đặc biệt
    str = str.replace(/\s+/g, ' ').trim(); // Xóa khoảng trắng thừa
    return str;
}

dayjs.extend(customParseFormat);

interface FormatDateOptions {
  inputFormat?: string;
  outputFormat?: string;
  locale?: string;
}
export const formatDate = (dateStr: string, options: FormatDateOptions = {}): string => {
  const { inputFormat = 'DDMMYYYY', outputFormat = 'ddd, DD MMM YYYY', locale = 'en' } = options;
  dayjs.locale(locale);
  const parsedDate = dayjs(dateStr, inputFormat);
  return parsedDate.isValid() ? parsedDate.format(outputFormat) : 'Invalid Date';
};

export const formatISODate = (dateStr: string, options: FormatDateOptions = {}): string => {
  const { 
    outputFormat = 'date', 
    locale = 'en' 
  } = options;

  dayjs.locale(locale);
  const parsedDate = dayjs(dateStr); // Tự động nhận diện ISO 8601

  if (!parsedDate.isValid()) {
    return 'Invalid Date';
  }

  const formats: Record<string, string> = {
    day: 'DD',              // 10
    time: 'HH:mm',       // 06:00
    weekday: 'ddd',         // Mon
    date: 'ddd, DD MMM YYYY',    // 10 Mar 2025
  };

  return parsedDate.format(formats[outputFormat] || formats['date']);
  
};

export function minutesToHours(minutes:number) {
  if (typeof minutes !== 'number' || minutes < 0) {
      return `0h : 0m` ; 
  }
  return `${Math.floor(minutes/60)}h : ${minutes%60}m` ; 
}

export function formatFlightNumber(flightNumber:string){
    const arrayFlightNumber = flightNumber.split(',') ; 
    if(arrayFlightNumber.length > 1){
      return `${arrayFlightNumber[0]}...` ; 
    }
    return arrayFlightNumber[0] ; 
}