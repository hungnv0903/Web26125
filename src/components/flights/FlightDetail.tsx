import { handleFlightDetail } from '@/redux/flights/flightDetailSlide';
import { AppDispatch, RootState } from '@/redux/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../ui/Modal';




export const FlightDetail = React.memo(() => {
    const dispath = useDispatch<AppDispatch>() ; 
    const {isOpen,Flight} = useSelector((state:RootState)=>state.flights.flightDetailReducer) ; 
    console.log(isOpen , Flight) ; 
    const handleCancel = ()=>{
      dispath(handleFlightDetail(null)) ; 
    }
    
  return (
    <>
      <CommonModal 
        open={isOpen}
        onCancel={handleCancel}
        content="This is flight detail"
        footer={null}
      />
    </>
  )
})
