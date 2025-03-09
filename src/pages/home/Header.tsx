import React, { useState } from 'react'
import { Segmented } from 'antd'
import SearchFormFlight from '../../components/flights/searchform'
import SearchFormHotel from '../../components/hotels/searchform'

const Header = () => {
  const [activeForm , setActiveForm] = useState('flight')
  const handleChangeSearchForm = (value:string)=>{
    setActiveForm(value) ; 
  }
  return (
    <>
     <div className={`bg-[url('src/assets/background/bg-3.png')] w-full h-screen bg-contain bg-no-repeat bg-right`}>
        <div className='my-10'>
          <div>
            <Segmented
              options={[
                { label: 'Flights', value: 'flight', icon: <i className="fa-solid fa-plane"></i> },
                { label: 'Hotels', value: 'hotels', icon: <i className="fa-solid fa-bed"></i> },
              ]}
              size="large"
               className="custom-segmented"
              value={activeForm}
              onChange={handleChangeSearchForm}
            />
          </div>
          <div className='my-5'>
              {
                activeForm==='flight' ? <SearchFormFlight></SearchFormFlight>:<SearchFormHotel></SearchFormHotel>
              }
          </div>
        </div>
     </div>
    </>
  )
}

export default Header