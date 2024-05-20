import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Oder from "../Pages/Oder/Oder/Oder";
import Login from "../Pages/Login/Login";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children : [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path : '/menu',
          element: <Menu/>
        },
        {
          path: 'oder/:category',
          element: <Oder/>
        },
        {
          path: '/login',
          element: <Login/>
        }
    ]
  },
]);
