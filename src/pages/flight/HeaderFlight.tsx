import { SearchOutlined } from '@ant-design/icons'
import { Button, Progress, Select } from 'antd'
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'


const HeaderFlight = () => {
    const progress = useSelector((state:RootState)=>state.searchFlightReducer.progress) ;  
    const isLoading = useSelector((state:RootState)=>state.searchFlightReducer.isLoading) ;
    
    console.log(progress , isLoading) ; 
  return (
    <Fragment>
        <div className='shadow-md flex justify-between items-center rounded-2xl p-3'>
            <div>
                <div className='text-base md:text-lg font-bold text-start flex gap-1 items-center'>
                    <div>Hà Nội <span className='text-orange-400'>(HAN)</span></div>
                    <svg className='mt-1' width="20" viewBox="0 8 57 22.5" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M8 18H41L45.8182 21H8V18Z" fill="#DA2128"></path><path d="M36.8835 21H48.5C39 16 40 17 33 11V18L36.8835 21Z" fill="#DA2128"></path></svg>
                    <div>Hồ Chí Minh <span className='text-orange-400'>(SGN)</span></div>
                </div>
                <div className='text-sm md:text-base flex gap-2 text-start text-gray-400 font-medium'>
                    <div>Sun,23 Feb 2025</div>
                    <div className='border-s-2 ps-2'>1 Passenger</div>
                </div>
            </div>
            <div>
                <Button className='w-full' type="primary" shape="circle" size='large' icon={<SearchOutlined />} />
            </div>
        </div>
        <div className='flex justify-between items-center my-3'>
            <div className='text-start py-2'>
                <h3 className='text-lg md:text-2xl font-medium text-orange-400'>Choose departure flight</h3>
                <span className='text-gray-400 font-normal'>50 Search results</span>
            </div>
            <div className='flex items-center gap-2'>
            <h3 className='hidden md:block text-base text-gray-400'>Sort by price</h3>
            <Select
                defaultValue="low"
                style={{ width: 130 }}
                // onChange={handleChange}
                options={[
                { value: 'low', label: 'Lowest price' },
                { value: 'hight', label: 'Highest price' },
                ]}
                />
            </div>
        </div>
        <div className='my-3'>
            <Progress percent={50} showInfo={false} />
        </div>
    </Fragment>
  )
}

export default HeaderFlight