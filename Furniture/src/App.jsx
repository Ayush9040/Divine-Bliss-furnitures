import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Component/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
// Services is intentionally disabled for now. Restore this import with the route below when needed.
// import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import Collections from "./pages/Collections";
import Craftsmanship from "./pages/Craftsmanship";
import Materials from "./pages/Materials";
import Bespoke from "./pages/Bespoke";

const App = () => {
  const routers = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        // Services is intentionally disabled for now. Uncomment with its import when the page returns.
        // {
        //   path: "/services",
        //   element: <Services />,
        // },
        {
          path: "/about",
          element: <AboutUs />,
        },
        {
          path: "/collections",
          element: <Collections />,
        },
        {
          path: "/craftsmanship",
          element: <Craftsmanship />,
        },
        {
          path: "/materials",
          element: <Materials />,
        },
        {
          path: "/bespoke",
          element: <Bespoke />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routers} />;
};

export default App;
