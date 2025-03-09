import React from 'react'
import FareDetails from '../../components/flights/FareDetails'
import SelectFlight from '../../components/flights/SelectFlight'

const YourFlights = () => {
  return (
    <>
       <div className='box-title-flight-detail flex items-center gap-3 px-4 py-3 border-b-gray-400 border-b-2'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-id="IcFlightAirlinesMultiple"><path d="M10.75 6.25L15.0476 6.45465C15.5808 6.48004 16 6.91972 16 7.45351V7.54649C16 8.08028 15.5808 8.51996 15.0476 8.54535L10.75 8.75L7.54627 13.6624C7.20548 14.1849 6.62384 14.5 6 14.5L7.5 8.75L4.25 8.5L3.29985 9.64018C3.10985 9.86818 2.8284 10 2.53163 10H2L2.5 7.5L2 5H2.53163C2.8284 5 3.10985 5.13182 3.29985 5.35982L4.25 6.5L7.5 6.25L6 0.5C6.62384 0.5 7.20548 0.815075 7.54627 1.33761L10.75 6.25Z" fill="#687176"></path><path d="M16.75 15.25L21.0476 15.4546C21.5808 15.48 22 15.9197 22 16.4535V16.5465C22 17.0803 21.5808 17.52 21.0476 17.5454L16.75 17.75L13.5463 22.6624C13.2055 23.1849 12.6238 23.5 12 23.5L13.5 17.75L10.25 17.5L9.29985 18.6402C9.10985 18.8682 8.8284 19 8.53163 19H8L8.5 16.5L8 14H8.53163C8.8284 14 9.10985 14.1318 9.29985 14.3598L10.25 15.5L13.5 15.25L12 9.5C12.6238 9.5 13.2055 9.81507 13.5463 10.3376L16.75 15.25Z" fill="#0194F3"></path></svg>
            <h3 className='text-lg font-semibold text-start capitalize'>Your flight</h3>
        </div>
        <SelectFlight></SelectFlight>
       <FareDetails></FareDetails>
    </>
  )
}

export default YourFlights