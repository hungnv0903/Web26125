import React, { Fragment } from 'react'
import YourFlights from './YourFlights'
import Filter from './FlightFilter'
import ListFlight from './ListFlight'
import { FlightDetail } from '../../components/flights/FlightDetail'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import Contact from './Contact'

const MainFlightPage = () => {
    const stateChooseFlight = useSelector((state:RootState)=>state.chooseFlightReducer.Status) ;
    console.log(stateChooseFlight) ; 
  return (
    <Fragment>
        <div className="grid grid-cols-6 gap-0 px-2 md:p-5 w-full xl:w-3/4 mx-auto transition-all duration-500 ease-in-out">
        <div className="col-left hidden lg:block col-span-2 cursor-pointer">
          <div className="sticky px-2 top-0">
            <div className="shadow-sm rounded-lg">
              <YourFlights />
            </div>
            <div>
                {!stateChooseFlight && (<Filter />)}
            </div>
          </div>
        </div>
        <div className="col-right col-span-6 lg:col-span-4 rounded-md md:ps-7">
            {!stateChooseFlight ?<ListFlight /> : <Contact/>}
        </div>
        <FlightDetail />
      </div>
    </Fragment>
  )
}

export default MainFlightPage