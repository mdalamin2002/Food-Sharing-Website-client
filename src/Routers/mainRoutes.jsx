import axios from "axios";
import { createBrowserRouter } from "react-router";
import Nofound from "../components/Nofound";
import RootLayout from "../layouts/RootLayout";
import AddFood from "../pages/AddFood";
import AvailableFoods from "../pages/AvailableFoods";
import DetailsPage from "../pages/DetailsPage";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyFoodRequest from "../pages/MyFoodRequest";
import MyFoods from "../pages/MyFoods";
import Register from "../pages/Register";
import UpdateFood from "../pages/UpdateFood";
import PrivateRoute from "./PrivateRoute";

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
        element: <PrivateRoute> <AddFood></AddFood> </PrivateRoute>
        
        ,
      },
      {
        path: "/available-foods",
        element: <AvailableFoods></AvailableFoods>,
      },
      {
        path: "/my-foods",
        element: 
        <PrivateRoute> <MyFoods></MyFoods> </PrivateRoute>
        ,
      },
      {
       path: "/request",
        element: <PrivateRoute>
          <MyFoodRequest></MyFoodRequest>

        </PrivateRoute>
        
        ,
       
  },
        
      
      {
        path: "/update-food/:id",
        element: <UpdateFood></UpdateFood>,
          loader: async ({ params }) => {
           const {data} = await axios.get(`https://mission-scic11-server-template.vercel.app/details/${params.id}`);
        return data
        }
        
          
      },
      {
        path: "/details/:foodId",
        element: <DetailsPage></DetailsPage>,
        loader: async ({ params }) => {
           const {data} = await axios.get(`https://mission-scic11-server-template.vercel.app/details/${params.foodId}`);
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
   {
    path: "/*",
    Component: Nofound,
  },
]);

export default mainRoutes;
