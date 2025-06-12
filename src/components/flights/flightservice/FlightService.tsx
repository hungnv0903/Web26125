import CommonDrawer from '@/components/ui/Drawer';
import { RootState } from '@/redux/store'
import getFlightsApi from '@/services/flightService';
import { NewResponseFlightConfirm } from '@/types/flightConfirmModel';
import { IAncillary, IBaggage, IResponseAncillary, IResponseBaggage } from '@/types/serviceModel';
import { groupListFlightValue, ServiceType } from '@/utils/helper';
import { Button} from 'antd';
import React, { useCallback, useEffect, useState} from 'react';
import { useSelector } from 'react-redux'
import { Fragment } from 'react/jsx-runtime';
import Baggage from './Baggage';
import Ancillary from './Ancillary';
import SeatMap from './SeatMap';

interface IServiceDataProps  {
    isLoading:boolean ; 
    Bagage:IBaggage[] ; 
    Ancillary:IAncillary[] ; 
}

const FlightService:React.FC = () => {
    const listFlightConfirm = useSelector((state:RootState)=>state.flights.flightConfirmReducer.ListFlightConfirm) ;
    const [serviceData, setServiceData] = React.useState<IServiceDataProps>({isLoading:false,Bagage:[],Ancillary:[]}) ;
    const [isOpenDrawerService, setIsOpenDrawerService] = React.useState(false);
    const [typeService , setTypeService] = useState<string>("") ; 
    
    // const getServiceFlightNormal = useCallback(()=>{
    //     if(!listFlightConfirm[0]?.ListFlightConfirm){
    //         return null ; 
    //     }
    //     const newListFlightNormal = groupListFlightValue(listFlightConfirm[0].ListFlightConfirm).map(item=>{
    //         return item.ListFlightValue.map(fl=>({System:item.System,FlightValue:fl})) ; 
    //     }).flatMap(item=>item) ; 

    //     const makePromises = (action: 'Baggage' | 'Ancillary') => newListFlightNormal.map(item =>getFlightsApi.service({ Action: action, DataGetService: item }));
        
    //     const arrPromiseBaggage = makePromises('Baggage');
    //     const arrPromiseAncillary = makePromises('Ancillary');

    //     return Promise.all([
    //         Promise.all(arrPromiseBaggage),
    //         Promise.all(arrPromiseAncillary)
    //     ]);

        
    // },[listFlightConfirm])

    // const getServiceFlightQHA = useCallback(()=>{
    //     const flightConfirmQHA = listFlightConfirm[1] ; 
    //     if(!flightConfirmQHA){
    //         return null ; 
    //     }

    //     const confirmQHA = flightConfirmQHA.Confirm as NewResponseFlightConfirm ; 
    //     const newFlightValueQHA = {
    //         System:'QHA',
    //         FlightValue:confirmQHA.Session
    //     }
    //     return Promise.all([
    //         getFlightsApi.service({Action:'Baggage',DataGetService:newFlightValueQHA}),
    //         getFlightsApi.service({Action:'Ancillary',DataGetService:newFlightValueQHA})
    //     ])
    // },[listFlightConfirm])

    // useEffect(()=>{
    //     const serviceFlightNormal = getServiceFlightNormal() ; 
    //     const serviceFlightQHA = getServiceFlightQHA() ; 
    //     const fetchServiceFlight = async ()=>{
    //         const responseServiceFlight =  await Promise.all([serviceFlightNormal,serviceFlightQHA])
    //         const responseServiceNormal= responseServiceFlight[0] ;
    //         const responseServiceQHA = responseServiceFlight[1] ;
    //         let listBaggage:IBaggage[] = [] ; 
    //         let listAncillary:IAncillary[] = [] ;
    //         if(responseServiceNormal){
    //             const baggageDataNormal = responseServiceNormal[0] as IResponseBaggage[] ; 
    //             const ancillaryDataNormal = responseServiceNormal[1] as IResponseAncillary[] ; 

    //             const listBaggageNormal = baggageDataNormal.flatMap(item=>item.ListBaggage) ; 
    //             const listAncillaryNormal = ancillaryDataNormal.flatMap(item=>item.ListAncillary) ; 
    //             listBaggage = [...listBaggage,...listBaggageNormal]
    //             listAncillary = [...listAncillary,...listAncillaryNormal] ; 
    //         }

    //         if(responseServiceQHA){
    //             const listBaggageQHA= (responseServiceQHA[0] as IResponseBaggage).ListBaggage ; 
    //             const listAncillaryQHA = (responseServiceQHA[1] as IResponseAncillary).ListAncillary ; 
    //             listBaggage = [...listBaggage,...listBaggageQHA]
    //             listAncillary = [...listAncillary,...listAncillaryQHA] ; 
            
    //         }

    //         setServiceData({isLoading:true,Bagage:listBaggage,Ancillary:listAncillary})

    //     }
    //     fetchServiceFlight() ; 

    //  },[getServiceFlightNormal,getServiceFlightQHA]) ; 
     
    //  console.log(serviceData) ;
     
     const showDrawerService = (action:string)=>{
        setIsOpenDrawerService(true)
        setTypeService(action) ; 
     }
     
  return (
    <Fragment>
            <div className='bg-[linear-gradient(rgb(178,238,248),rgb(201,244,224))] p-2 my-1 rounded-md cursor-pointer min-h-96'>
                <div> 
                    <h3 className='capitalize text-lg md:text-2xl text-start font-medium text-orange-400'>
                        Flight Essentials
                    </h3>
                </div>
                {!serviceData.isLoading && (
                    ServiceType.map(item=>(
                        <div key={item.Action} className='bg-white rounded-md my-5 overflow-hidden shadow-xl'>
                            <div className='flex items-center p-2 gap-2'>
                                <div className='w-10' >
                                    <img className='w-full' src="src\assets\icon\baggage.webp" alt="" />
                                </div>
                                <div className='text-start'>
                                    <span className='font-semibold text-base'>{item.Title}</span>
                                    <p className='text-gray-500'>{item.Description}</p>
                                </div>
                            </div>
                            <div className='flex justify-between items-center bg-blue-50 p-2 mt-3'>
                                <div className='font-semibold flex items-center gap-2 text-green-500'>
                                    <div><i className="fa-solid fa-circle-check"></i></div> 
                                    <div>Baggage has been added.</div> 
                                </div>
                                <Button onClick={()=>showDrawerService(item.Action)} color="primary" variant="filled" size='middle'>
                                    <span className='font-bold'>Select</span>                            
                                </Button>
                                
                            </div>
                        </div>
                    ))
                
                )}
                <CommonDrawer
                open={isOpenDrawerService}
                onClose={() => setIsOpenDrawerService(false)}
                title={<div className='text-xl text-center'>{ServiceType.find(item=>item.Action===typeService)?.Title}</div> }
                footer={null}
                
                >
                {
                    typeService==='Bag' ? <Baggage /> : 
                    typeService==='Ancil' ? <Ancillary/> : 
                    typeService==='Seat' ? <SeatMap/> : ""
                }
                </CommonDrawer>
            </div>
            
    </Fragment>
  )
}

export default FlightService ; 