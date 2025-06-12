import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { App } from 'antd'
import Navbar from './Navbar'
import { MessageProvider } from '@/context/MessageProvider'

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