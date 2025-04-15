import { Modal } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { handleFlightDetail } from '../../redux/flightDetailSlide';



export const FlightDetail = () => {
    const dispath = useDispatch<AppDispatch>() ; 
    const {isOpen,Flight} = useSelector((state:RootState)=>state.flightDetailReducer) ; 
    console.log(isOpen , Flight) ; 
    const handleCancel = ()=>{
      dispath(handleFlightDetail(null)) ; 
    }
    
  return (
    <>
      <Modal title="Basic Modal" open={isOpen} onCancel={handleCancel}>
            <div>

            </div>
      </Modal>
    </>
  )
}
