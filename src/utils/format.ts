import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
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

export function formatFlightNumber(flightNumber:string){
    const arrayFlightNumber = flightNumber.split(',') ; 
    if(arrayFlightNumber.length > 1){
      return `${arrayFlightNumber[0]}...` ; 
    }
    return arrayFlightNumber[0] ; 
}