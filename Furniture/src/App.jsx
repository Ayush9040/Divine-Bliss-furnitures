import { createBrowserRouter , RouterProvider} from "react-router-dom"
import Navbar from "./Component/Navbar"
import HeroSection from "./pages/HeroSection"
import Aboutus from "./pages/Aboutus"
import Design from "./pages/Design"
const App = () => {
  const routers = createBrowserRouter([
    {
      path:"/",
      element:
      <>
        <Navbar/>
        <HeroSection/>
        <Aboutus/>
        <Design/>
      </>
    }
  ])

  return (
    <RouterProvider router={routers}>
    </RouterProvider>
  )
}

export default App