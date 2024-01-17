import { NavLink, Outlet } from "react-router-dom";
import {
  FaBook,
  FaCalendar,
  FaFile,
  FaHouse,
  FaUser,
  FaWrench,
} from "react-icons/fa6";

import useAdmin from "../../hooks/UseAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();

  return (
    <div className="flex">
      <div className=" w-64 min-h-screen bg-orange-400">
        <ul className="menu lg:p-4">
          {isAdmin ? (
            <>
              <li defaultChecked>
                <NavLink to="/dashboard/allUsers">
                  <FaHouse></FaHouse>
                  All User
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/allTest">
                  <FaHouse></FaHouse>
                  All Test
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reservations">
                  <FaHouse></FaHouse>
                  Reservations
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allBanner">
                  <FaHouse></FaHouse>
                  All Banner
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addTest">
                  <FaHouse></FaHouse>
                  Add a Test
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/banner">
                  <FaHouse></FaHouse>
                  Add a Banner
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/myProfile">
                  <FaUser></FaUser>
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myAppoinment">
                  <FaCalendar></FaCalendar>
                  Upcoming Appointment
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myReservations">
                  <FaBook></FaBook>
                  Reservations
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/testResult">
                  <FaFile></FaFile>
                  Test Result
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <FaFile></FaFile>
                  Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/updateProfile">
                  <FaWrench></FaWrench>
                  Update Profile
                </NavLink>
              </li>
            </>
          )}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHouse></FaHouse>
              Home
            </NavLink>
          </li>
        </ul>
      </div>
      {/*  dashboard content */}
      <div className="flex-1 lg:p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
