import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import Users from "../pages/Users";
import UpdateUsers from "../pages/UpdateUsers";
import UserDetails from "../pages/UserDetails";
  
export const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[{
        path: "/",
        element:<Users/>
      },
    {
      path:"/users/edit/:userId",
      element:<UpdateUsers/>
    },
    {
      path:"/users/details/:userId",
      element:<UserDetails/>
    }
  ]
    },
  ]);