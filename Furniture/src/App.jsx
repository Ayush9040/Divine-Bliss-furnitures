import { createBrowserRouter , RouterProvider} from "react-router-dom"
import Navbar from "./Component/Navbar"
import HeroSection from "./Component/Home/HeroSection"
import Aboutus from "./Component/Home/Aboutus"
import Design from "./Component/Home/Design"
import Footer from "./Component/Footer"
import DesignService from './Component/Home/DesignService'
import PeopleDesign from './Component/Home/PeopleDesign'
import Home from "./pages/Home"

const App = () => {
  const routers = createBrowserRouter([
    {
      path:"/",
      element:
      <>
        <Navbar/>
        <Home />
        <Footer/>
      </>
    }
  ])

  return (
    <RouterProvider router={routers}>
    </RouterProvider>
  )
}

export default App