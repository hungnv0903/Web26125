import React, { Fragment } from 'react'
import YourFlights from '@/components/flights/YourFlights'
import Filter from '@/components/flights/FlightFilter'
import { FlightDetail } from '@/components/flights/FlightDetail'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import Contact from '@/components/flights/contact/Contact'
import BookFlight from '@/components/flights/BookFlight'
import FlightList from '@/components/flights/FlightList'
import FlightService from '@/components/flights/flightservice/FlightService'

const MainFlightPage = () => {
    const stateChooseFlight = useSelector((state:RootState)=>state.flights.chooseFlightReducer.Status) ;
    const stateFlightConfirm = useSelector((state:RootState)=>state.flights.flightConfirmReducer.Status) ; 
  return (
    <Fragment>
        <div className="grid grid-cols-6 gap-0 px-2 md:p-5 w-full xl:w-3/4 mx-auto transition-all duration-500 ease-in-out">
        <div className="col-left hidden lg:block col-span-2 cursor-pointer">
          <div className="sticky px-2 top-0">
            <div className="shadow-lg rounded-lg">
              <YourFlights />
            </div>
            <div>
                {!stateChooseFlight && (<Filter />)}
            </div>
          </div>
        </div>
        <div className="col-right col-span-6 lg:col-span-4 rounded-md lg:ps-7">
            {
            !stateChooseFlight ? <FlightList /> : 
            (stateFlightConfirm ?
              <div>
                <FlightService />
                <BookFlight />
              </div>
              :<Contact/>)
            }
        </div>
        <FlightDetail />
      </div>
    </Fragment>
  )
}

export default MainFlightPage