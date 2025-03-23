import { SearchOutlined } from '@ant-design/icons'
import { Button} from 'antd'
import React, { Fragment, memo} from 'react'
import {useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { IListFlightSearch } from '../../types/searchModel'
import { AirportInfo, formatDate } from '../../utils/master'

interface ListFlightProp {
    ListFlightInfo:IListFlightSearch [] |null | undefined; 
    Passenger:number ; 
}

const FlightInfo = ({ListFlightInfo,Passenger}:ListFlightProp)=>{
    return (
        <div className='flex gap-10'>
        {ListFlightInfo && ListFlightInfo.map((flight,index)=>(
            <div key={index}>
                <div className='text-base md:text-base font-bold text-start flex gap-1 items-center'>
                    <div>{AirportInfo(flight.StartPoint)?.CityName} <span className='text-orange-400'>({flight.StartPoint})</span></div>
                    <svg className='mt-1' width="20" viewBox="0 8 57 22.5" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M8 18H41L45.8182 21H8V18Z" fill="#DA2128"></path><path d="M36.8835 21H48.5C39 16 40 17 33 11V18L36.8835 21Z" fill="#DA2128"></path></svg>
                    <div>{AirportInfo(flight.EndPoint)?.CityName} <span className='text-orange-400'>({flight.EndPoint})</span></div>
                </div>
                <div className='text-sm flex gap-2 text-start text-gray-400 font-medium'>
                    <div>{formatDate(flight.DepartDate)}</div>
                    <div className='border-s-2 ps-2'>{Passenger} Passenger</div>
                </div>
            </div>
        ))}
        </div>
    )
}

const HeaderFlight = () => {
    const {Adt,Chd,Inf,Domestic,ListFlight} = useSelector((state:RootState)=>state.searchFormReducer) ; 
    const journey = useSelector((state:RootState)=>state.chooseFlightReducer.Journey) ; 
    const stateChooseFlight = useSelector((state:RootState)=>state.chooseFlightReducer.Status) ;
    const flighJourneytInfo = ListFlight?.filter(flight=>flight.Leg===journey) ;  

    
  return (
    <Fragment>
        { !stateChooseFlight && (    
            <div className='shadow-md flex justify-between items-center rounded-2xl p-3'>
                <div>
                    <h3 className='mb-2 text-lg md:text-xl text-start font-medium text-orange-400'>
                        {Domestic ? ` ${journey===0 ? 'Choose departure flight': journey===1 ? 'Choose departure flight':''}` : 'Choose flight'}
                    </h3>
                    <FlightInfo ListFlightInfo={Domestic?flighJourneytInfo:ListFlight} Passenger={Adt+Chd+Inf}></FlightInfo>
                    
                </div>
                <div>
                    <Button className='w-full' type="primary" shape="circle" size='large' icon={<SearchOutlined />} />
                </div>
            </div>
        )}
    </Fragment>
  )
}

export default memo(HeaderFlight) ; 