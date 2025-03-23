import React, { Fragment, useEffect, useState } from 'react'
import Flight from '../../components/flights/Flight'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { IListFareData } from '../../types/flightModel';
import { Progress, Select } from 'antd';

const groupFlights = (dataAllFlight: IListFareData[]) => {
  const groups = new Map<string, IListFareData[]>();
  dataAllFlight.forEach(item => {
    const { ListFlight } = item.ListOption[0];
    const groupKey:string = ListFlight.map(flight=>`key_${item.System}_${flight.Airline}_${flight.FlightNumber}_${flight.StartPoint}_${flight.EndPoint}_${flight.StartDate}_${flight.EndDate}`).join('_') ; 

    if (!groups.has(groupKey)) {
      groups.set(groupKey, []);
    }
    groups.get(groupKey)?.push(item);
  });

  groups.forEach(group => {
    group.sort((a, b) => a.TotalPrice - b.TotalPrice);
  });

  return groups ; 
};

const ListFlight = () => {
  const progress = useSelector((state:RootState)=>state.searchFlightReducer.progress) ;  
  const isLoading = useSelector((state:RootState)=>state.searchFlightReducer.isLoading) ;
  const allFlight = useSelector((state:RootState)=>state.searchFlightReducer.allFlight) ;
  const journey = useSelector((state:RootState)=>state.chooseFlightReducer.Journey) ; 
  const stateChooseFlight = useSelector((state:RootState)=>state.chooseFlightReducer.Status) ;
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const groupListFlightData = groupFlights(allFlight) ; 
  const mainListFlight = Array.from(groupListFlightData).map(([key,value])=>({...value[0],keyFlight:key,TicketOrtherNumber:value.length-1}))
  const listFlightRoute = mainListFlight.filter(flight=>flight.ListOption[0].ListFlight[0].Leg===journey) ;
  // console.log(listFlightRoute) ; 
  useEffect(() => {
          if (!isLoading) {
            const timer = setTimeout(() => {
              setIsVisible(false);
            },500);
            return () => clearTimeout(timer);
          }
    }, [isLoading]); 
    
  return (
    <Fragment>
      { !stateChooseFlight && (
      <div>
        <div className='flex justify-between items-center my-3'>
              <div className='text-start py-2'>
                  <span className='text-gray-400 font-normal'>{listFlightRoute.length} Search results</span>
              </div>
              <div className='flex items-center gap-2'>
              <h3 className='hidden md:block text-base text-gray-400'>Sort by price</h3>
              <Select
                  defaultValue="low"
                  style={{ width: 130 }}
                  // onChange={handleChange}
                  options={[
                  { value: 'low', label: 'Lowest price' },
                  { value: 'hight', label: 'Highest price' },
                  ]}
                  />
              </div>
        </div>
        { isVisible && (
            <div className='my-3 transition-all duration-500 ease-in-out'>
                <Progress percent={progress} showInfo={false} status="active" />
                <p className='text-center text-orange-400 font-semibold'>The system is searching for flights. Please wait... {progress}%</p>
            </div>
        )}
        <div className='flex flex-col gap-3 transition-all duration-500 ease-in-out'>
          {listFlightRoute.map(flight=>(
              <Flight key={flight.keyFlight} flightInfo={flight} ></Flight>              
            
          ))}
        </div>
      </div>
      )}
    </Fragment>
  )
}

export default ListFlight