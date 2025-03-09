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