import { Button } from 'antd'
import React, { createContext, useContext } from 'react'
import { IListFareData} from '../../types/flightModel'
import FlightInfo from './FlightInfo';
import { useDispatch} from 'react-redux';
import { AppDispatch} from '../../redux/store';
import { handleChooseFlight } from '../../redux/chooseFlightSlice';

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
  const dispatch = useDispatch<AppDispatch>() ; 
  const valueContext:FlightContextProp = {
    flightInfo:flightInfo,
  }

  return (
    <FlightContext.Provider value={valueContext}>
        <div className='card-flight cursor-pointer rounded-2xl p-3 transition-all duration-500 ease-in-out '>
            <FlightInfo></FlightInfo>
            <div className='flex justify-end md:justify-between items-center border-t border-t-gray-300 mt-3 pt-3'>
                <div className='hidden md:flex items-center gap-5'>
                    {/* <div className='font-semibold text-gray-400'>Flight Details</div>   */}
                    <Button color="primary" variant="text" shape='round'>
                       Flight Details
                    </Button>
                    { flightInfo.TicketOrtherNumber > 0 && (
                      <Button color="primary" variant="text" shape='round'>
                        <span className='font-bold'>{flightInfo.TicketOrtherNumber}</span> 
                        <span className=''>Other Fare Categories</span>  
                      </Button>
                    )}
                </div>
                <div className='flex items-center gap-4'>
                    <div className='text-lg flex items-center'> 
                    <h3 className='font-bold text-orange-400'>{flightInfo.PriceAdt.toLocaleString('vi-VN')}</h3>
                    <h3 className='ms-2 font-bold text-blue-400'>{flightInfo.Currency}</h3>
                    </div>
                    <Button onClick={()=>dispatch(handleChooseFlight(flightInfo))} className='w-24' type="primary" size='middle' variant="filled" shape='round' >
                      Choose
                    </Button>
                </div>
            </div>
        </div>
    </FlightContext.Provider>
  )
}

export default Flight