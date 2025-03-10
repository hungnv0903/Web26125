import React, { Fragment } from 'react'
import Flight from '../../components/flights/Flight'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { IListFareData } from '../../types/flightModel';

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
  const allFlight = useSelector((state:RootState)=>state.searchFlightReducer.allFlight) ;
  const groupListFlightData = groupFlights(allFlight) ; 
  const mainListFlight = Array.from(groupListFlightData).map(([key,value])=>({...value[0],keyFlight:key,TicketOrtherNumber:value.length-1}))
  const listFlightRoute = mainListFlight.filter(flight=>flight.ListOption[0].ListFlight[0].Leg===0) ; 
  console.log(listFlightRoute) ;  
  return (
    <Fragment>
        <div className='flex flex-col gap-3'>
          {listFlightRoute.map(flight=>(
              <Flight key={flight.keyFlight} flightInfo={flight} ></Flight>              
            
          ))}
        </div>
    </Fragment>
  )
}

export default ListFlight