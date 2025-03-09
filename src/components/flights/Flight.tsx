import { Button } from 'antd'
import React, { createContext, useContext } from 'react'
import { IListFareData } from '../../types/flightModel'
import FlightInfo from './FlightInfo';

interface FlightInfoProp extends IListFareData {
    TicketOrtherNumber: number ;
}

interface FlightContextProp {
    flightInfo:FlightInfoProp
}

export const FlightContext = createContext<FlightContextProp | null>(null) ; 

export const useFlightContext = () => {
    const context = useContext(FlightContext);
    if (!context) {
      throw new Error('useFlightContext must be used within an FlightProvider');
    }
    return context;
  };

const Flight = ({flightInfo}:FlightContextProp) => {
  const valueContext:FlightContextProp = {
    flightInfo:flightInfo,
  }
  return (
    <FlightContext.Provider value={valueContext}>
        <div className='relative overflow-hidden shadow-md hover:shadow-blue-300 rounded-2xl p-3 transition-all duration-500 ease-in-out '>
            <FlightInfo></FlightInfo>
            <div className='flex justify-between items-center border-t border-t-gray-300 mt-3 pt-3'>
                <div className='flex items-center gap-5'>
                    <div>
                    <Button color="danger" variant="filled" shape='round'>
                        <span className='font-bold'>{flightInfo.TicketOrtherNumber}</span> 
                        <span className=''>Other Fare Categories</span>  
                    </Button>
                    </div>
                    <div className='font-semibold text-gray-400'>Flight Details</div>  
                </div>
                <div className='flex items-center gap-4'>
                    <div className='text-lg flex items-center'> 
                    <h3 className='font-bold text-orange-400'>{flightInfo.PriceAdt.toLocaleString('vi-VN')}</h3>
                    <h3 className='ms-2 font-bold text-blue-400'>{flightInfo.Currency}</h3>
                    </div>
                    <Button className='w-30' type="primary" size='large' variant="filled" shape='round' >
                    Choose
                    </Button>
                </div>
            </div>
            <div className='absolute top-[10px] right-[-80px] bg-pink-600 w-50 text-white font-semibold rotate-45'>
                Eco
            </div>
        </div>
    </FlightContext.Provider>
  )
}

export default Flight