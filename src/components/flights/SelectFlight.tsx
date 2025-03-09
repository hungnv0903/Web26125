import { Button } from 'antd'
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { AirportInfo, formatDate } from '../../utils/master';

const SelectFlight = () => {
    const ListFlightInfo = useSelector((state:RootState)=>state.searchFormReducer.ListFlight) ; 
    console.log(ListFlightInfo) ;
     
  return (
    <Fragment>
        {ListFlightInfo?.map(flight=>(
            <div key={flight.Leg} className='px-4 py-3 flex flex-col gap-4'>
                <div className='flex items-center  gap-3'>
                    <div className='w-8 h-8 flex items-center justify-center text-white p-1 bg-blue-400 rounded-full'>
                        {flight.Leg + 1}
                    </div>
                    <div>
                        <div className='text-start text-gray-400 font-bold'>{formatDate(flight.DepartDate)}</div>
                        <h5 className='font-semibold text-start flex gap-1 items-center'>
                            <span>{AirportInfo(flight.StartPoint)?.CityName}</span>
                            <svg className='mt-1' width="20" viewBox="0 8 57 22.5" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M8 18H41L45.8182 21H8V18Z" fill="#DA2128"></path><path d="M36.8835 21H48.5C39 16 40 17 33 11V18L36.8835 21Z" fill="#DA2128"></path></svg>
                            <span>{AirportInfo(flight.EndPoint)?.CityName}</span>
                        </h5>
                    </div>
                </div>
                <div className='price-detail flex flex-col gap-3 mt-5'>
                    <div className='flex items-center gap-3'>
                        <div className='w-16 h-5 overflow-hidden flex items-center'>
                        <img className='w-full' src="http://squirrel.kaotours.com/Assets/Airline/VJ.gif" alt="" />
                        </div>
                    </div>                    
                    <div className='flex items-center justify-center gap-10'>
                        <div className='flex flex-col'>
                            <p className='font-bold text-xl'>05:30</p>
                            <p className='text-gray-400 font-semibold'>HAN</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-gray-400'>2h : 10m</p>
                            <div className='flex gap-2 items-center'>
                                <div className='bg-gray-300 w-1 h-1 rounded-full'></div>
                                <img className='w-5' src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/98c00ca547d0c81f5e679902afc1bc68.svg" alt="" />
                                <div className='bg-gray-300 w-1 h-1 rounded-full'></div>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <p className='font-bold text-xl'>10:30</p>
                            <p className='text-gray-400 font-semibold'>SGN</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-12 items-center gap-2'>
                        <Button className='col-span-9 transition-all duration-500 ease-in-out' color="danger" variant="filled">Change departure flight</Button>
                        <Button className='col-span-3 transition-all duration-500 ease-in-out' color="primary" variant="filled">Details</Button>
                    </div>
                </div>
            </div>
        ))}
    </Fragment>
  )
}

export default SelectFlight