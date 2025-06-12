import { Button} from 'antd';
import React, { useCallback, useState } from 'react'
import CommonModal from '../ui/Modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { NewResponseFlightConfirm} from '@/types/flightConfirmModel';
import { getOrderIdentify, groupListFlightValue } from '@/utils/helper';
import { IBookFlight } from '@/types/bookModel';
import { useNavigate } from 'react-router-dom';

const BookFlight:React.FC = () => {
    const navigate = useNavigate() ; 
    const [openResponsive, setOpenResponsive] = useState(false);
    const formData = useSelector((state:RootState)=>state.flights.contactFormReducer)
    const flightConfirm = useSelector((state:RootState)=>state.flights.flightConfirmReducer.ListFlightConfirm) ; 
    const [loadings, setLoadings] = useState<boolean[]>([]);

    const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
  };
    
    const bookFlightNormal = useCallback((orderIdentify:string)=>{
        const dataNormal = flightConfirm[0];
        if(!dataNormal){
            return null ; 
        } 
        const responseConfirm: NewResponseFlightConfirm[] = dataNormal.Confirm as NewResponseFlightConfirm[] ;  
        const listFlightConfirm = groupListFlightValue(dataNormal.ListFlightConfirm ) ;          
        const dataBook:IBookFlight[] = responseConfirm.map((item,index)=>{
            const bookItem:IBookFlight =  {
                Contact:formData.Contact,
                ListPassenger:formData.ListPassenger,
                ListFlightValue:listFlightConfirm[index].ListFlightValue,
                System:listFlightConfirm[index].System,
                BookIdentify:orderIdentify,
                VerifySession:item.Session,
            }
            return bookItem ; 
        })
        
        return dataBook
        
    },[])
    
    const bookFlightQHA = useCallback((orderIdentify:string)=>{
        const dataQHA = flightConfirm[1];
        if(!dataQHA){
            return null ; 
        } 
        const responseConfirm:NewResponseFlightConfirm = dataQHA.Confirm as NewResponseFlightConfirm ; 
        const dataBookQHA:IBookFlight = {
            ListPassenger:formData.ListPassenger,
            System:'QHA',
            BookIdentify:orderIdentify,
            VerifySession:responseConfirm.Session,

        }
        return dataBookQHA ;  

    },[])

    const handleBookConfirm = ()=>{
        const orderIdentify  = getOrderIdentify() ; 
        const promiseBookFlightNormal = bookFlightNormal(orderIdentify) ; 
        const promiseBookFlightQHA = bookFlightQHA(orderIdentify) ; 
        console.log(promiseBookFlightNormal);
        console.log(promiseBookFlightQHA) ; 
        enterLoading(0);
        setTimeout(function(){
             setLoadings([]) ; 
             setOpenResponsive(false) ; 
             navigate('/payment') ; 

        },2000)

    }

    const handleCancelBookConfirm = ()=>{
        if(loadings.length===0){
            setOpenResponsive(false) ; 
        }
    }
  return (
   <>
    <div className='flex justify-between mt-3'>
            <Button className='w-32' type="primary" size='large' variant="solid" shape='default' >
                    Back
            </Button>
            <Button onClick={() => setOpenResponsive(true)} className='w-32' type="primary" size='large' variant="solid" shape='default' >
                    Confirm
            </Button>
            <CommonModal
                open={openResponsive}
                onOk={handleBookConfirm}
                onCancel={handleCancelBookConfirm}
                content="This content modal"
                okText='Book Now'
                title={<div className='text-xl'><i className="fa-solid fa-circle-check me-2 text-green-700"></i>Confirm Booking Information</div>}
                okButtonProps={{ size: 'large', loading:loadings[0] }} // class , type , size....,         
                cancelButtonProps={{ size: 'large' }}
            />
            
        </div>
   </>
  )
}

export default BookFlight