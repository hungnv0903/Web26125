import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface IActivePassengerProp {
  ActivePassenger(index:number) : void ; 
}


const PassengerSlider = ({ActivePassenger}:IActivePassengerProp) => {
  const listPassenger = useSelector((state:RootState)=>state.flights.contactFormReducer.ListPassenger)
  console.log(listPassenger) ; 
  return (
    <>
        <Swiper
        modules={[Navigation,]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        onSlideChange={(swiper)=>ActivePassenger(swiper.activeIndex)}
        >
          {
            listPassenger && listPassenger.map(pasenger=>(
            <SwiperSlide key={pasenger.Index} style={{display:'flex',justifyContent:'center'}}>
                <div className='w-[70%] rounded-md shadow-md overflow-hidden m-1'>
                  <div className='text-center text-white bg-gradient-to-b from-blue-400 to-blue-600 p-2 w-full'>
                    <div>{pasenger.Type==='ADT' ? 'Adult' : pasenger.Type==='CHD'?'Child':'Infant'}</div>
                    <div className='font-bold text-base'>{`${pasenger.LastName} ${pasenger.FirstName}`}</div>
                  </div>
                  <div className='text-center p-3'>
                    <div className='font-bold'>HAN-SGN</div>
                    <div className='font-normal'>Bạn chưa chọn gói hành lý nào !</div>
                  </div>
                </div>
            </SwiperSlide>
            ))
          }
          
        </Swiper>
    </>
  )
}

export default PassengerSlider