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
import AddBanner from "../Pages/AdminDashboard/Banner/AddBanner";
import AllBanner from "../Pages/AdminDashboard/Banner/AllBanner";
import Payment from "../Pages/Payment/Payment";
import PaymentHistory from "../paymentHistory/paymentHistory";
import UpcomingAppointment from "../Pages/UpcomingAppointment/UpcomingAppointment";
import Error from "../Pages/Error/Error";
import MyProfile from "../Pages/Profile/MyProfile";
import UpdateProfile from "../Pages/Profile/UpdateProfile";
import TestResult from "../Pages/TestResult/TestResult";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
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

      // normal user routes
      {
        path: "/card/details/:id",
        element: (
          <PrivateRoutes>
            <TestDetails></TestDetails>
          </PrivateRoutes>
        ),
        loader: async ({ params }) =>
          await fetch(
            `https://accu-med-diagnostics-server.vercel.app/card/details/${params.id}`
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
          // normal user

          {
            path: "/dashboard/myProfile",
            element: (
              <PrivateRoutes>
                <MyProfile></MyProfile>
              </PrivateRoutes>
            ),
          },
          {
            path: "/dashboard/updateProfile",
            element: <UpdateProfile></UpdateProfile>,
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
            path: "/dashboard/testResult",
            element: (
              <PrivateRoutes>
                <TestResult></TestResult>
              </PrivateRoutes>
            ),
          },
          {
            path: "/dashboard/paymentHistory",
            element: (
              <PrivateRoutes>
                <PaymentHistory></PaymentHistory>
              </PrivateRoutes>
            ),
          },
          {
            path: "/dashboard/myAppoinment",
            element: (
              <PrivateRoutes>
                <UpcomingAppointment></UpcomingAppointment>
              </PrivateRoutes>
            ),
          },
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
              await fetch(
                `https://accu-med-diagnostics-server.vercel.app/card/details/${params.id}`
              ),
          },
          {
            path: "/dashboard/reservations",
            element: (
              <AdminRoutes>
                <Reservations></Reservations>
              </AdminRoutes>
            ),
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
          {
            path: "/dashboard/banner",
            element: (
              <AdminRoutes>
                <AddBanner></AddBanner>
              </AdminRoutes>
            ),
          },
          {
            path: "/dashboard/allBanner",
            element: (
              <AdminRoutes>
                <AllBanner></AllBanner>
              </AdminRoutes>
            ),
          },
          {
            path: "/dashboard/reservations",
            element: (
              <AdminRoutes>
                <AllBanner></AllBanner>
              </AdminRoutes>
            ),
          },
          // normal user routes
          {
            path: "/dashboard/reservation/payment",
            element: <Payment></Payment>,
          },
        ],
      },
    ],
  },
]);
