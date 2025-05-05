import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './layouts'
import HomePage from './pages/home'
import FlightPage from './pages/flight'
import AboutPage from './pages/about'
import NotFoundPage from './pages/notfound'
import SelectService from './pages/select-service-flight/SelectService'


function App() {
  const router  = createBrowserRouter([
    {
      path:"/",element:<Layout></Layout> , children:[
        {index:true,element:<HomePage></HomePage>},
        {path:'flights',element:<FlightPage></FlightPage>},
        {path:'select-service',element:<SelectService></SelectService> },
        {path:'about',element:<AboutPage></AboutPage>},
        {path:'*',element:<NotFoundPage></NotFoundPage>},
      ]
    }
  ])  
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
