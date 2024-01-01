import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import Dashboard from "../Layout/Dashboard/Dashboard";
import AllTest from "../Pages/AdminDashboard/AllTest/AdminAllTest";
import AddTest from "../Pages/AdminDashboard/AddTest";
import AllUsers from "../Pages/AdminDashboard/AllUsers";
import PrivateRoutes from "./PrivateRoutes";

import AdminRoutes from "./AdminRoutes";
import AdminAllTest from "../Pages/AdminDashboard/AllTest/AdminAllTest";
import UpdateTest from "../Pages/AdminDashboard/AllTest/UpdateTest";
import Reservations from "../Pages/AdminDashboard/Resevations/Reservations";
import TestDetails from "../Pages/Home/Home/Services/TestDetails";
import AllTests from "../Pages/AllTests/AllTests";
import MyReservations from "../Pages/MyReservations/MyReservations";

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
        path: "/allTests",
        element: <AllTests></AllTests>,
      },

      {
        path: "/card/details/:id",
        element: (
          <PrivateRoutes>
            <TestDetails></TestDetails>
          </PrivateRoutes>
        ),
        loader: async ({ params }) =>
          await fetch(`http://localhost:5000/card/details/${params.id}`),
      },
      {
        path: "/dashboard/myReservations",
        element: (
          <PrivateRoutes>
            <MyReservations></MyReservations>
          </PrivateRoutes>
        ),
      },

      {
        path: "/dashboard",
        element: (
          <PrivateRoutes>
            <Dashboard></Dashboard>
          </PrivateRoutes>
        ),
        children: [
          // normal user routes

          // admin dashboard
          {
            path: "/dashboard/addTest",
            element: (
              <AdminRoutes>
                <AddTest></AddTest>
              </AdminRoutes>
            ),
          },
          {
            path: "/dashboard/updateTest/:id",
            element: (
              <AdminRoutes>
                <UpdateTest></UpdateTest>
              </AdminRoutes>
            ),
            loader: async ({ params }) =>
              await fetch(`http://localhost:5000/card/details/${params.id}`),
          },
          {
            path: "/dashboard/reservations/:id",
            element: (
              <AdminRoutes>
                <Reservations></Reservations>
              </AdminRoutes>
            ),
            loader: async ({ params }) =>
              await fetch(`http://localhost:5000/card/details/${params.id}`),
          },

          {
            path: "/dashboard/allUsers",
            element: (
              <AdminRoutes>
                <AllUsers></AllUsers>
              </AdminRoutes>
            ),
          },
          {
            path: "/dashboard/allTest",
            element: (
              <AdminRoutes>
                <AdminAllTest></AdminAllTest>
              </AdminRoutes>
            ),
          },
        ],
      },
    ],
  },
]);
