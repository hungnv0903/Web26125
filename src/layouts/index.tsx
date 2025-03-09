import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { App } from 'antd'
import { MessageProvider } from '../context/MessageProvider'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <App>
      <MessageProvider>
        <Navbar></Navbar>
        <main>
          <Outlet></Outlet>
        </main>
        <Footer></Footer>
      </MessageProvider>
    </App>
  )
}

export default Layout