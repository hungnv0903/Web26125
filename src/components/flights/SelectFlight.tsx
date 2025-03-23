import { Button, Collapse } from 'antd'
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { AirportInfo, formatDate } from '../../utils/master';
import FlightTime from './FlightTime';
import { handleChangeFlight } from '../../redux/chooseFlightSlice';

const SelectFlight = () => {
    const dispatch = useDispatch<AppDispatch>() ; 
    const listFlightInfo = useSelector((state:RootState)=>state.searchFormReducer.ListFlight) ; 
    const listSelectFlight = useSelector((state:RootState)=>state.chooseFlightReducer.ListFlight); 
    console.log(listFlightInfo) ;
    const newListSelectFlight = listSelectFlight.flatMap(item=>item.ListOption[0].ListFlight) ; 
    console.log("ListSelectFlight" , newListSelectFlight) ; 
    
    const findFlightItem = (leg:number)=>{
       const flightItem =  newListSelectFlight.find(item=>item.Leg===leg) ;
       return flightItem ;  
    } 
     
  return (
    <Fragment>
        {listFlightInfo?.map(flight=>(
            <div key={flight.Leg} className='px-4 py-3 flex flex-col gap-0'>
                <Collapse
                    expandIcon={()=>null}
                    activeKey={[(findFlightItem(flight.Leg) ? 'show' : '')]}
                    size="small"
                    expandIconPosition="end"
                    items={[{ 
                         key: "show",
                         label: (
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
                         ),
                         children: <div>
                            {findFlightItem(flight.Leg) && (
                                <div className='price-detail flex flex-col gap-3 transition-all duration-500 ease-in-out'>
                                    <div className='flex items-center gap-3'>
                                        <div className='w-16 h-5 overflow-hidden flex items-center'>
                                            <img className='w-full' src={`http://squirrel.kaotours.com/Assets/Airline/${findFlightItem(flight.Leg)?.Airline}.gif`} alt="" />
                                        </div>
                                    </div>                    
                                    <FlightTime Flight={findFlightItem(flight.Leg)}></FlightTime>
                                    <div className='grid grid-cols-12 items-center gap-2'>
                                        <Button onClick={()=>dispatch(handleChangeFlight(flight.Leg))} className='col-span-9 transition-all duration-500 ease-in-out' color="danger" variant="filled">Change departure flight</Button>
                                        <Button className='col-span-3 transition-all duration-500 ease-in-out' color="primary" variant="filled">Details</Button>
                                    </div>
                                </div>
                            )}
                            </div>
                        }]}
                  />
            </div>
        ))}
    </Fragment>
  )
}

export default SelectFlight