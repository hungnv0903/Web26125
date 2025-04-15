import React from 'react'
import { minutesToHours } from '../../utils/helper'
import { IListFlight } from '../../types/flightModel'
import { formatISODate } from '../../utils/format';

interface FlightTimeProp {
    Flight:IListFlight | undefined; 
}

const FlightTime = ({Flight}:FlightTimeProp) => {
    
  return (
    <>
    {Flight && (
        <div className="flex items-center justify-center gap-10">
            <div className="flex flex-col">
                <p className="font-bold text-xl">{formatISODate(Flight.StartDate,{outputFormat: 'time' })}</p>
                <p className="text-gray-400 font-normal">{Flight.StartPoint}</p>
            </div>
            <div className="flex flex-col">
                <p className="text-gray-400">{minutesToHours(Flight.Duration)}</p>
                <div className="flex items-center">
                    <img className='w-20' src="https://abtrip.vn/images/frontend/icons/chuyen-bay3.gif" alt="image" />
                </div>
                <p className="text-gray-400">{Flight.StopNum !==0 ? `${Flight.StopNum} Stops` :'Direct flight'}</p>
            <div className='font-semibold text-gray-400'></div>
            </div>
            <div className="flex flex-col">
                <p className="font-bold text-xl">{formatISODate(Flight.EndDate,{outputFormat: 'time' })}</p>
                <p className="text-gray-400 font-normal">{Flight.EndPoint}</p>
            </div>
        </div>
    )}
    </>
  )
}

export default FlightTime;