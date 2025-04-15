import React, { Fragment, useEffect, useState } from 'react'
import Flight from '../../components/flights/Flight'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { IListFareData } from '../../types/flightModel';
import { Progress, Select } from 'antd';
import { AirlineProp, DurationProp, PricePassengerProp } from '../../types/filterModel';
import { handleDataCollectionFilter } from '../../redux/dataCollectionFilterSlice';

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
  const dispatch = useDispatch<AppDispatch>() ; 
  const {Domestic} = useSelector((state:RootState)=>state.searchFormReducer) ; 
  const {progress,isLoading,allFlight,isData} = useSelector((state:RootState)=>state.searchFlightReducer) ; 
  const journey = useSelector((state:RootState)=>state.chooseFlightReducer.Journey) ; 
  const dataFlightFilter = useSelector((state:RootState)=>state.filterFlightReducer) ; 
  
  const [isVisible, setIsVisible] = useState<boolean>(!isData?true:false);
  const [sortFlight , setSortFlight] = useState<string>('low') ; 

  const groupListFlightData = groupFlights(allFlight) ; 
  const mainListFlight = Array.from(groupListFlightData).map(([key,value])=>({...value[0],keyFlight:key,TicketOrtherNumber:value.length-1}))
  const listFlightRoute = mainListFlight.filter(item=>item.ListOption[0].ListFlight[0].Leg===journey) ; 
  
  useEffect(() => {
    let pricePassengerMin = Infinity;
    let pricePassengerMax = 0;
    let durationMin = Infinity;
    let durationMax = 0;
    const airlineDataFilter = listFlightRoute.reduce(
      (acc: { [key: string]: AirlineProp }, item) => {
        const flights = item.ListOption?.[0]?.ListFlight || [];
        if (item.PriceAdt < pricePassengerMin) {
          pricePassengerMin = item.PriceAdt;
        }
        if (item.PriceAdt > pricePassengerMax) {
          pricePassengerMax = item.PriceAdt;
        }
        const processedAirlines = new Set<string>();
        for (const flight of flights) {
          const airline = flight.Airline;
          const duration = flight.Duration;
          if (duration < durationMin) {
            durationMin = duration;
          }
          if (duration > durationMax) {
            durationMax = duration;
          }
  
          if (processedAirlines.has(airline)) continue;
          processedAirlines.add(airline);
  
          if (!acc[airline]) {
            acc[airline] = {
              Airline: airline,
              MinPrice: item.PriceAdt,
            };
          } else {
            if (item.PriceAdt < acc[airline].MinPrice) {
              acc[airline].MinPrice = item.PriceAdt;
            }
          }
        }
        return acc;
      },
      {} as { [key: string]: AirlineProp } 
    );
  
    const result = Object.values(airlineDataFilter);
    const duration:DurationProp =  {DurationMin:durationMin,DurationMax:durationMax} ; 
    const pricePassenger:PricePassengerProp = {PricePassengerMin:pricePassengerMin, PricePassengerMax:pricePassengerMax} ; 
    if(isData){
      dispatch(handleDataCollectionFilter({ListAirline:result,Duration:duration,PricePassenger:pricePassenger}))
    }
  }, [isData,listFlightRoute, dispatch]);
  
  const {Transit,DepartureTime, ArrivalTime,Airline,Duration,PricePassenger } = dataFlightFilter ;
  const listFlightShow =  listFlightRoute.filter(item=>{
    const flights = item.ListOption[0].ListFlight;
    // filter StopNum
    const checkTransit = Transit.length===0 ? true : flights.some(flight=>{
      if(!Transit.includes(2)){
        return Transit.includes(flight.StopNum) ; 
      }else{
        return Transit.includes(flight.StopNum) || flight.StopNum >=2 ; 
      }
    })
    //filter StartDate
    const checkDepartureTime = DepartureTime.length===0 ? true : flights.some(flight=>{
      const date = new Date(flight.StartDate);
      const hour = date.getHours();
      return DepartureTime.some(time=>time ? (time[0]<=hour && hour<=time[1]) : false)
    })
    //filter Enđate
    const checkArrivalTime = ArrivalTime.length===0 ? true : flights.some(flight=>{
      const date = new Date(flight.EndDate);
      const hour = date.getHours();
      return ArrivalTime.some(time=>time ? (time[0] <= hour && hour <= time[1]):false)
    })

    const checkAirline = Airline.length===0 ? true : flights.some(flight=>Airline.includes(flight.Airline)) ; 
    
    const checkDuration = Duration.length===0 ? true : flights.some(flight=>(Math.floor(flight.Duration/60) >= Duration[0]) && (Math.ceil(flight.Duration/60)) <= Duration[1]) ; 
    
    const checkPricePassenger = PricePassenger.length===0 ? true : (item.PriceAdt >= PricePassenger[0] && item.PriceAdt<=PricePassenger[1]) ; 
    return checkTransit && checkDepartureTime && checkArrivalTime && checkAirline && checkDuration && checkPricePassenger; 

  }).sort((a:IListFareData,b:IListFareData)=>{ //sort
    return sortFlight==='low' ? (a.PriceAdt-b.PriceAdt): b.PriceAdt-a.PriceAdt ; 
    })
  
  console.log(listFlightShow) ; 

  useEffect(() => {
          if (!isLoading) {
            const timer = setTimeout(() => {
              setIsVisible(false);
            },500);
            return () => clearTimeout(timer);
          }
    }, [isLoading]); 

    const handleSortFlight = (value:string)=>{
      setSortFlight(value) ; 
    }
    
  return (
    <Fragment>
      <div>
        <div className='flex justify-between items-center'> 
            <h3 className='text-lg md:text-2xl text-start font-medium text-orange-400'>
                {Domestic ? ` ${journey===0 ? 'Choose departure flight': journey===1 ? 'Choose return flight':''}` : 'Choose flight'}
            </h3>
        </div>
        <div className='flex justify-between items-center mb-3'>
              <div className='text-start'>
                  <span className='text-gray-400 font-normal'>{listFlightShow.length} Search results</span>
              </div>
              <div className='flex items-center gap-2'>
              <h3 className='hidden md:block text-base text-gray-400'>Sort by price</h3>
              <Select
                  defaultValue="low"
                  style={{ width: 130 }}
                  onChange={handleSortFlight}
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
          {listFlightShow.map(flight=>(
              <Flight key={flight.keyFlight} flightInfo={flight} ></Flight>              
          ))}
        </div>
      </div>
     
    </Fragment>
  )
}

export default ListFlight