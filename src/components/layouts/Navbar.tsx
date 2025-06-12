import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
// import { SearchOutlined } from '@ant-design/icons'
// import { Input } from 'antd'
// import { NavLink } from 'react-router-dom'


const Navbar = () => {
  // const navlink = [
  //   {path:'/', title:'Home',},
  //   {path:'/flights', title:'Flights'},
  //   {path:'/hotels', title:'Hotels'},
  //   {path:'/car-rental', title:'Car Rental'},
  // ]

  return (
    <Fragment>
        <nav className='main-navbar grid grid-cols-6 py-3 px-4 shadow-md'>
          <div className='col-span-6 sm:col-span-1 flex flex-col transition-all duration-500 ease-in-out'>
            <div className='flex items-center justify-center lg:justify-start'>
              <div className='w-40'>
                <NavLink to={'/'}>
                  <img className='w-full' src="src/assets/logo-kaotours.png" alt="" />
                </NavLink>
              </div>
            </div>
          </div>
          {/* <div className='mt-2 sm:mt-0 col-span-6 sm:col-span-5 flex items-center justify-start sm:justify-end lg:justify-between transition-all duration-500 ease-in-out'>
              <div className='hidden lg:block'>
                <ul className='flex items-center'>
                  {
                    navlink.map((link)=>(
                      <li key={link.title}>
                        <NavLink 
                        to={link.path}
                        className={({isActive,isPending})=>`hover:scale-125 hover:transition-all hover:duration-500 hover:ease-in-out flex items-center px-3 mx-3 ${isPending ? 'pending' : isActive ? 'active' : ''}`}
                        >
                        <span className='font-medium'>{link.title}</span>
                        </NavLink>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className='flex items-center'>
                <div className='me-5'>
                <Input
                  placeholder="Tìm kiếm..."
                  size="large"
                  prefix={<SearchOutlined />}
                />
                </div>
                <span className='me-5'><i className="fa-solid fa-user-large"></i></span>
                <span className='me-5'><i className="fa-solid fa-gear"></i></span>
                <span className='me-5'><i className="fa-solid fa-bell"></i></span>
              </div>
          </div> */}
        </nav>
    </Fragment>
  )
}

export default Navbar