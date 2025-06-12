import { formatFlightNumber } from "@/utils/format";
import { useFlightContext } from "./Flight";
import FlightTime from "./FlightTime";




const FlightInfo = () => {
  const {flightInfo} = useFlightContext() ;  
  return (
    <>
    {flightInfo.ListOption[0].ListFlight.map((item,index)=>(
        <div key={item.FlightValue} className={`${index > 0 ? 'mt-5' : ''} flex items-center justify-center md:justify-between gap-3`}>
            <div className='w-20 hidden md:flex items-center h-5 overflow-hidden'>
                <img className='w-full h-full object-contain' src={`http://flynow.vn/Assets/Airline/${item.Airline}.gif`} alt="logo" />
            </div>
            <div className='w-20 hidden md:block'>
                <span className="font-family-none font-semibold text-sm italic text-pink-600">{formatFlightNumber(item.FlightNumber)}</span>
            </div>
            <FlightTime Flight={item}></FlightTime>
            <div className='hidden md:flex flex-col w-40 gap-0'>
                <div className='flex justify-end font-bold italic text-pink-600 text-end font-serif'>
                    <div className='text-fare-type'>
                        {item.ListSegment[0].FareType}
                    </div>
                </div>
                <div className='text-end'>
                    <span className='font-normal text-sm text-gray-400'>Ticket type : </span>
                    <span className='font-semibold italic text-sm text-gray-400'>{item.ListSegment[0].SeatAvl}{item.ListSegment[0].Class}</span>
                </div>
            </div>
        </div>
    ))}
    
    </>
  )
}

export default FlightInfo