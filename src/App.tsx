import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/layouts'
import HomePage from './pages/home'
import FlightPage from './pages/flight'
import AboutPage from './pages/about'
import NotFoundPage from './pages/notfound'
import PaymentPage from './pages/payment'




function App() {
  const router  = createBrowserRouter([
    {
      path:"/",element:<Layout></Layout> , children:[
        {index:true,element:<HomePage></HomePage>},
        {path:'flights',element:<FlightPage></FlightPage>},
        {path:'about',element:<AboutPage></AboutPage>},
        {path:'payment',element:<PaymentPage></PaymentPage>},

        {path:'*',element:<NotFoundPage></NotFoundPage>},
      ]
    }
  ])  
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
