import { Button } from 'antd';
import React, { useState } from 'react'
import JourneyService from './Journey';
import PassengerSlider from './PassengerSlider';
import BaggageItem from './BaggageItem';

const Ancillary = () => {
  const [routeService , setRouteService] = useState<string>('')
  const [indexPassenger , setIndexPassenger] = useState<number>(0) ; 
  console.log(routeService , indexPassenger) ; 
  return (
   <>
    <div>
      <JourneyService handleChangeRoute={(route)=>setRouteService(route)} />
      <PassengerSlider ActivePassenger={(index)=>setIndexPassenger(index)} />
      <div className='my-5'>
        <h3 className='font-bold text-xl'>Chọn thêm hành lý</h3>
        <div className='mt-5 flex flex-wrap'>
          <BaggageItem />
          <BaggageItem />
          <BaggageItem />
          <BaggageItem />
          <BaggageItem />
          <BaggageItem />
          <BaggageItem />
          <BaggageItem />
          <BaggageItem />
          <BaggageItem />
          <BaggageItem />
          <BaggageItem />
        </div>
      </div>
      <div className='bg-white border-t-2 border-t-gray-100 w-full py-3 px-5 flex items-center justify-between absolute bottom-0 left-0'>
        <div className='text-base'>
          <div className='italic text-lg font-semibold'>Tổng</div>
          <div className='font-bold flex items-center gap-2'>
            <div className='text-orange-400'>500.000</div>
            <div className='text-blue-400'>VND</div>
          </div>
        </div>
        <div>
          <Button color="primary" size='large' shape='round' variant="solid">
            Confirm
          </Button>
        </div>
      </div>
    </div>
   </>
  )
}

export default Ancillary