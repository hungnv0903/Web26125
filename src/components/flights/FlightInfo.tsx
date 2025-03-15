import React from 'react'
import {useFlightContext } from './Flight'
import { formatFlightNumber, formatISODate, minutesToHours } from '../../utils/master';


const FlightInfo = () => {
  const {flightInfo} = useFlightContext() ;  
  return (
    <>
    {flightInfo.ListOption[0].ListFlight.map((item,index)=>(
        <div key={item.FlightValue} className={`${index > 0 ? 'mt-5' : ''} flex items-center justify-center md:justify-between gap-3`}>
            <div className='w-20 hidden md:flex items-center h-5 overflow-hidden'>
                <img className='w-full h-full object-contain' src={`http://squirrel.kaotours.com/Assets/Airline/${item.Airline}.gif`} alt="logo" />
            </div>
            <div className='w-20 hidden md:block'>
                <div className="font-bold italic text-pink-600 font-serif">{formatFlightNumber(item.FlightNumber)}</div>
            </div>
            <div className="flex items-center justify-center gap-10">
                <div className="flex flex-col">
                    <p className="font-bold text-xl">{formatISODate(item.StartDate,{outputFormat: 'time' })}</p>
                    <p className="text-gray-400 font-normal">{item.StartPoint}</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-gray-400">{minutesToHours(item.Duration)}</p>
                    <div className="flex items-center">
                        <img className='w-20' src="https://abtrip.vn/images/frontend/icons/chuyen-bay3.gif" alt="image" />
                    </div>
                    <p className="text-gray-400">{item.StopNum !==0 ? `${item.StopNum} Stops` :'Direct flight'}</p>
                <div className='font-semibold text-gray-400'></div>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold text-xl">{formatISODate(item.EndDate,{outputFormat: 'time' })}</p>
                    <p className="text-gray-400 font-normal">{item.EndPoint}</p>
                </div>
            </div>
            <div className='hidden md:flex flex-col w-40 gap-0'>
                <div className='font-bold italic text-pink-600 text-end font-serif'>
                    {item.ListSegment[0].FareType}
                </div>
                <div className='text-end'>
                    <span className='font-normal text-sm text-gray-400'>Ticket type : </span>
                    <span className='font-semibold italic text-base text-gray-400'>{item.ListSegment[0].SeatAvl}{item.ListSegment[0].Class}</span>
                </div>
            </div>
        </div>
    ))}
    
    </>
  )
}

export default FlightInfo