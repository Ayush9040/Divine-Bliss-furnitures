import { createBrowserRouter , RouterProvider} from "react-router-dom"
import Navbar from "./Component/Navbar"
import HeroSection from "./pages/HeroSection"
import Aboutus from "./pages/Aboutus"
import Design from "./pages/Design"
import Footer from "./Component/Footer"
import DesignService from './pages/DesignService'
import PeopleDesign from './pages/PeopleDesign'

const App = () => {
  const routers = createBrowserRouter([
    {
      path:"/",
      element:
      <>
        <Navbar/>
        <HeroSection/>
        <Aboutus/>
        <DesignService/>
        <Design/>
        <PeopleDesign/>
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