import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import Dashboard from "../Layout/Dashboard/Dashboard";
import AllTest from "../Pages/AllTest/AllTest";
import AddTest from "../Pages/AdminDashboard/AddTest";
import AllUsers from "../Pages/AdminDashboard/AllUsers";
import PrivateRoutes from "./PrivateRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/allTest",
        element: <AllTest></AllTest>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoutes>
            <Dashboard></Dashboard>
          </PrivateRoutes>
        ),
      },

      // normal user routes

      // admin dashboard
      {
        path: "/dashboard/addTest",
        element: (
          <PrivateRoutes>
            <AddTest></AddTest>
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/allUsers",
        element: (
          <PrivateRoutes>
            <AllUsers></AllUsers>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
