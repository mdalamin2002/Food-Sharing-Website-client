import axios from "axios";
import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AddFood from "../pages/AddFood";
import AvailableFoods from "../pages/AvailableFoods";
import DetailsPage from "../pages/DetailsPage";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyFoods from "../pages/MyFoods";
import Register from "../pages/Register";

const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/add-food",
        element: <AddFood></AddFood>,
      },
      {
        path: "/available-foods",
        element: <AvailableFoods></AvailableFoods>,
      },
      {
        path: "/my-foods",
        element: <MyFoods></MyFoods>,
      },
      {
        path: "/details/:foodId",
        element: <DetailsPage></DetailsPage>,
        loader: async ({ params }) => {
           const {data} = await axios.get(`http://localhost:5000/details/${params.foodId}`);
        return data
        }
         
        
      },
      
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "registration",
        element: <Register></Register>,
      },
      {},
    ],
  },
]);

export default mainRoutes;
