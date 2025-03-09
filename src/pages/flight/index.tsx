import React, { Fragment } from 'react'
import { useDispatch} from 'react-redux'
import { AppDispatch} from '../../redux/store'
import Filter from './FlightFilter';
import YourFlights from './YourFlights';
import ListFlight from './ListFlight';
import HeaderFlight from './HeaderFlight';
import { AirportInfo } from '../../utils/master';
import { fetchDataFlight } from '../../redux/searchFlightsSlice';
import { ISearchData, ISearchFlight } from '../../types/searchModel';
import { useLocation } from 'react-router-dom';
import { handleSearchForm } from '../../redux/searchFormSlice';


const FlightPage = () => {
  const location = useLocation() ; 
  const dispatch = useDispatch<AppDispatch>() ; 

  const params = new URLSearchParams(location.search) ; 
  const startPoint = params.get('sp') ; 
  const endPoint = params.get('ep') ; 
  const departDate = params.get('dt')?.split('.') ; 
  const passenger = params.get('ps')?.split('.').map(ps=>Number(ps)) ; 

  if(startPoint && endPoint && departDate && passenger){

    const checkDomesticFlight = AirportInfo(startPoint)?.CountryCode==='VN' && AirportInfo(endPoint)?.CountryCode==='VN' ; 
    const systems = checkDomesticFlight?["VNA","VJA","VUA","QHA"]:["1AS","VNA","VJA"] ;
    const flightSearch:ISearchFlight = {
      Adt:passenger[0],
      Chd:passenger[1],
      Inf:passenger[2],
      ListFlight: departDate? departDate.map((item,index)=>{
          return {
              Leg:index,
              StartPoint:index===0?startPoint:endPoint,
              EndPoint:index===0?endPoint:startPoint,
              DepartDate:item,
          }
      }):null,
    } 
    const searchData:ISearchData = {
      flightSearch:flightSearch,
      systems:systems,
    }

    dispatch(handleSearchForm(flightSearch)) ; 
    dispatch(fetchDataFlight(searchData))
  }

  return (
    <Fragment>
      <div className='grid grid-cols-12 gap-3 p-5 w-full xl:w-3/4 mx-auto transition-all duration-500 ease-in-out'>
        <div className='col-left hidden lg:block col-span-4 cursor-pointer'>
          <div className='shadow-sm rounded-lg '>
            <YourFlights></YourFlights>
          </div>
          <div>
            <Filter></Filter>
          </div>
        </div>
        <div className='col-right col-span-12 lg:col-span-8 rounded-md ps-3 '>
          <div>
            <HeaderFlight></HeaderFlight>
            <ListFlight></ListFlight>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default FlightPage