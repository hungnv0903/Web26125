import { RootState } from '@/redux/store'
import React, {useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Tabs } from 'antd'


interface IJourneyProp {
    handleChangeRoute(route:string): void ; 
}

const JourneyService = ({handleChangeRoute}:IJourneyProp) => {
  const listFlight = useSelector((state: RootState) => state.flights.searchFormReducer.ListFlight);
  const items = useMemo(() => (
    listFlight?.map(flight => ({
      key: flight.StartPoint + flight.EndPoint,
      label: <div className='font-semibold text-base flex gap-2'><span>{flight.Leg===0 ? 'Departure' : 'Return'}</span></div>,
      children: null,
    })) || []
  ), [listFlight]);

  const [route , setRoute] = useState<string>(items[0].key) ; 
  useEffect(()=>{
    handleChangeRoute(route) ; 
  },[route])

  return (
    <div className=''>
     <Tabs className='w-full flex items-center justify-center select-none'
        defaultActiveKey={items[0].key}
        onChange={(key)=>setRoute(key)}
        items={items} />
    </div>
  );
};

export default  JourneyService;