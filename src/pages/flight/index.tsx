import React, { Fragment, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { AirportInfo } from '@/utils/helper';
import { fetchDataFlight } from '@/redux/flights/searchFlightsSlice';
import { ISearchData, ISearchFlight } from '@/types/searchModel';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleSearchForm } from '@/redux/flights/searchFormSlice';
import './index.scss';
import { handleNumberChoose } from '@/redux/flights/chooseFlightSlice';
import MainFlightPage from './MainFlightPage';

const FlightPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isDataFlight = useSelector((state:RootState)=>state.flights.searchFlightReducer.isData) ;

  useEffect(() => {
    if(!isDataFlight){

      const params = new URLSearchParams(location.search);
      const startPoint = params.get('sp');
      const endPoint = params.get('ep');
      const departDate = params.get('dt')?.split('.');
      const passenger = params.get('ps')?.split('.').map(ps => Number(ps));
      
      if (!startPoint || !endPoint || !departDate || !passenger || passenger.length !== 3) {
        navigate('/', { replace: true });
        return; 
      }
      
      const checkDomesticFlight = AirportInfo(startPoint)?.CountryCode === 'VN' && AirportInfo(endPoint)?.CountryCode === 'VN';
      
      const systems = checkDomesticFlight ? ['VNA', 'VJA', 'VUA', 'QHA'] : ['1AS', 'VNA', 'VJA'];
      
      const flightSearch: ISearchFlight = {
        Adt: passenger[0],
        Chd: passenger[1],
        Inf: passenger[2],
        Domestic: checkDomesticFlight,
        ListFlight: departDate.map((item, index) => ({
        Leg: index,
        StartPoint: index === 0 ? startPoint : endPoint,
        EndPoint: index === 0 ? endPoint : startPoint,
        DepartDate: item,
      })),
    };
    
    const searchData: ISearchData = {
      flightSearch,
      systems,
    };
    
    dispatch(handleSearchForm(flightSearch));
    dispatch(handleNumberChoose(departDate.length));
    dispatch(fetchDataFlight(searchData));
  }

  }, [location.search, navigate, dispatch,isDataFlight]);

  return (
    <Fragment>
      <MainFlightPage></MainFlightPage>
    </Fragment>
  );
};

export default FlightPage;
