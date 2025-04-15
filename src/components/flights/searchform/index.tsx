import './index.css';
import React, {Fragment, useCallback, useState } from 'react';
import Passenger from './Passenger';
import { DatePicker, GetProps, Input, Popover, Select } from 'antd';
import ListMap from './ListMap';
import useDebounce from '../../../hook/useDebounce';
import { AirportInfo } from '../../../utils/helper';
import { PassengerProp} from '../../../types/searchModel';
import dayjs, { Dayjs } from 'dayjs';
import { useMessage } from '../../../context/MessageProvider';
import { useNavigate } from 'react-router-dom';

const { RangePicker } = DatePicker;
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
const startpointTitle = <span className="text-lg">Choose a starting point</span>;
const endpointTitle = <span className="text-lg">Choose a end point</span>;
const passengerTitle = <span className="text-lg">Passenger</span>;

const SearchFormFlight = () => {
    const [journey , setJourney] = useState<boolean>(true) ; 
    const [startPoint , setStartPoint] = useState<string>('HAN') ; 
    const [endPoint , setEndPoint] = useState<string>('SGN') ; 
    const [dateRange, setDateRange] = useState<[Dayjs,Dayjs] | null >([dayjs().add(1, 'day'), dayjs().add(5, 'day')]);
    const [dateSingle, setDateSingle] = useState< Dayjs | null >(dayjs().add(1, 'day'));
    const [passenger , setPassenger] = useState<PassengerProp>({"Adt":1,"Chd":0,"Inf":0})
    const [openSpListMap , setOpenSpListMap] = useState<boolean>(false) ;
    const [openEpListMap , setOpenEpListMap] = useState<boolean>(false) ;
    const {message} = useMessage() ;

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        return current && current.isBefore(dayjs().startOf('day'));
      };

    const handleSelectStartPoint = useCallback((code:string)=>{
    setOpenSpListMap(false) ; 
    setStartPoint(code) ;
    },[])
     
    const handleChangeStartpoint = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setStartPoint(event.target.value) ; 
    setOpenSpListMap(true) ; 
    }

    const handleSelectEndPoint = useCallback((code:string)=>{
        setEndPoint(code) ;
        setOpenEpListMap(false); 
    },[])
       
    const handleChangeEndPoint = (event:React.ChangeEvent<HTMLInputElement>)=>{ 
        setEndPoint(event.target.value) ;
        setOpenEpListMap(true) ; 
    }

    
    const navigate = useNavigate() ; 
    const handleSearchFlight = ()=>{
        if(startPoint==='' || endPoint==='' || (journey && !dateRange) || (!journey && !dateSingle)){
            message.warning("Please fill all your journey's information!") ; 
        }else if(startPoint===endPoint){
            message.warning("The start point and the end point cannot be the same!") ;
        }else{
            
            const departDate = (journey && dateRange)?dateRange.map((item)=>dayjs((item).toDate()).format('DDMMYYYY')):(!journey && dateSingle)?[dayjs((dateSingle).toDate()).format('DDMMYYYY')]:null ;  
            const urlFlightPage = `/flights?sp=${startPoint}&ep=${endPoint}&dt=${departDate?.join('.')}&ps=${passenger.Adt}.${passenger.Chd}.${passenger.Inf}`; 
            navigate(urlFlightPage, { replace: true }) ; 
            
        }
        
    }
    
  return (
    <Fragment>
        <div className='p-4 cursor-pointer'>
            <div className='text-3xl md:text-5xl font-normal'>Jet set, ready, go!</div>
            <div className='my-5 xl:w-3/4 mx-auto shadow-2xl p-4 bg-white rounded-xl transition-all duration-500 ease-in-out'>
                <div className='flex flex-row justify-center md:justify-start items-center gap-1.5 md:w-96'> 
                    <Select
                        defaultValue={journey}
                        style={{ width: 130 }}
                        onChange={(value)=>setJourney(value)}
                        options={[
                            { value: true, label: (<><i className="me-2 fa-solid fa-right-left"></i>Round trip</>)},
                            { value: false, label: (<><i className="me-2 fa-solid fa-right-long"></i>One-way</>)},
                        ]}
                    />
                    <Popover content={<Passenger  handlePassengerProp={useCallback((ps)=>setPassenger(ps),[])}></Passenger>} arrow={false} placement="bottom" title={passengerTitle} trigger="click">
                          <div className="border rounded-md px-3 py-1.5 border-gray-300 cursor-pointer">
                            <p className="text-sm">
                              <i className="me-2 fa-solid fa-users"></i>
                              <span>{passenger.Adt+passenger.Chd+passenger.Inf} <span>Passengers</span></span>
                            </p>
                          </div>
                    </Popover>
                </div>
                <div className='flex items-center flex-col md:flex-row justify-between gap-3 my-3'>
                    <Popover content={<ListMap searchValueProp={useDebounce<string>(startPoint,800)} 
                        handleSelectAirportCode={handleSelectStartPoint}></ListMap>} 
                        arrow={false} 
                        autoAdjustOverflow={false} 
                        placement="bottomLeft" 
                        title={startpointTitle}
                        open={openSpListMap}
                        onOpenChange={(open)=>setOpenSpListMap(open)} 
                        trigger="click">
                        <div className='flex w-full md:w-60 flex-col items-start gap-1 text-start bg-gray-100 hover:bg-gray-200 p-2 px-3 rounded-md transition-all duration-500 ease-in-out'>
                            <label className='text-md' htmlFor=""><i className="me-2 fa-solid fa-plane-departure"></i>From</label>
                            <Input type='text' 
                            onChange={handleChangeStartpoint} 
                            variant="borderless" 
                            value={(AirportInfo(startPoint)?.CityName)?`${AirportInfo(startPoint)?.CityName} (${startPoint})`:startPoint} 
                            className='font-semibold' 
                            size="large" 
                            style={{ padding: 0, borderRadius:0 }} />
                        </div>
                    </Popover>
                    <Popover content={<ListMap searchValueProp={useDebounce<string>(endPoint,800)} 
                        handleSelectAirportCode={handleSelectEndPoint}></ListMap>} 
                        arrow={false} 
                        autoAdjustOverflow={false} 
                        placement="bottomLeft" 
                        title={endpointTitle} 
                        open={openEpListMap}
                        onOpenChange={(open)=>setOpenEpListMap(open)}
                        trigger="click">
                        <div className='flex flex-col w-full md:w-60 items-start gap-1 text-start bg-gray-100 hover:bg-gray-200 p-2 px-3 rounded-md transition-all duration-500 ease-in-out'>
                            <label className='text-md' htmlFor=""><i className="me-2 fa-solid fa-plane-departure"></i>To</label>
                            <Input type='text' 
                            onChange={handleChangeEndPoint} 
                            variant="borderless" 
                            value={(AirportInfo(endPoint)?.CityName)?`${AirportInfo(endPoint)?.CityName} (${endPoint})`:endPoint} 
                            className='font-semibold' 
                            size="large" 
                            style={{ padding: 0, borderRadius:0 }} />
                        </div>
                    </Popover>

                    <div className='rangepicker-custom flex flex-col w-full md:w-72 items-start gap-1 text-start bg-gray-100 hover:bg-gray-200  p-2 px-3 rounded-md transition-all duration-500 ease-in-out'>
                        <label className='text-md' htmlFor=""><i className="me-2 fa-solid fa-calendar-days"></i>DepartDate</label>
                        {
                        (journey ? (
                            <RangePicker variant="borderless"
                            className='font-semibold w-full'
                            size="large"
                            format="DD/MM/YYYY"
                            disabledDate={disabledDate}
                            onChange={(dates)=>setDateRange(dates as [Dayjs,Dayjs] | null)}
                            value={dateRange}
                            style={{ padding: 0 }} />

                        ):(

                            <DatePicker variant="borderless"
                            className='font-semibold w-full'
                            size="large"
                            format="DD/MM/YYYY"
                            disabledDate={disabledDate}
                            onChange={(dates)=>setDateSingle(dates as Dayjs | null)}
                            value={dateSingle}
                            style={{ padding: 0 }} />
                        ))
                        }  
                    </div>
                    <div className='flex flex-col items-start gap-1 text-start p-2 px-3 rounded-md transition-all duration-500 ease-in-out'>
                        <button className="button" onClick={handleSearchFlight}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default SearchFormFlight