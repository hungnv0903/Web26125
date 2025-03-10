import React from 'react'
import {useFlightContext } from './Flight'
import { formatISODate } from '../../utils/master';


const FlightInfo = () => {
  const {flightInfo} = useFlightContext() ;  
  return (
    <>
    {flightInfo.ListOption[0].ListFlight.map((item)=>(
        <div key={item.FlightValue} className='flex items-center justify-between gap-3'>
        <div className='w-20 flex items-center h-5 overflow-hidden'>
            <img className='w-full h-full object-contain' src={`http://squirrel.kaotours.com/Assets/Airline/${item.Airline}.gif`} alt="logo" />
        </div>
        <div className="flex items-center justify-center gap-10">
            <div className="flex flex-col">
                <p className="font-bold text-xl">{formatISODate(item.StartDate,{outputFormat: 'time' })}</p>
                <p className="text-gray-400 font-semibold">{item.StartPoint}</p>
            </div>
            <div className="flex flex-col">
                <p className="text-gray-400">2h : 10m</p>
                <div className="flex items-center">
                    <div className="bg-gray-300 w-2 h-2 rounded-full"></div>
                    <div className="bg-gray-300 w-20 h-0.5 ms-0.5 transition-all duration-500 ease-in-out"></div>
                    <img className="w-5" src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/98c00ca547d0c81f5e679902afc1bc68.svg" alt="" />
                </div>
                <p className="text-gray-400">{item.FlightNumber}</p>
            </div>
            <div className="flex flex-col">
                <p className="font-bold text-xl">{formatISODate(item.StartDate,{outputFormat: 'time' })}</p>
                <p className="text-gray-400 font-semibold">{item.EndPoint}</p>
            </div>
        </div>
        <div className='flex flex-col gap-1 me-12'>
            {
                item.StopNum!==0 && (
                    <div className='font-semibold text-gray-400'>{item.StopNum} Stops</div>
                )
            }
            <div>
                <span className='font-semibold text-gray-400'>Ticket type : </span>
                <span className='font-semibold italic text-base text-gray-400'>9E</span>
            </div>
        </div>
        </div>
    ))}
    
    </>
  )
}

export default FlightInfo