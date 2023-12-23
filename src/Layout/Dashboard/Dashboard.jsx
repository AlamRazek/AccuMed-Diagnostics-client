import { NavLink, Outlet } from "react-router-dom";
import { FaBook, FaCalendar, FaHouse, FaUser } from "react-icons/fa6";

import useAdmin from "../../Hooks/UseAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();

  return (
    <div className="flex">
      <div className=" w-64 min-h-screen bg-orange-400">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/allUsers">
                  <FaHouse></FaHouse>
                  All User
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addTest">
                  <FaHouse></FaHouse>
                  Add a Test
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
                  My Upcoming Appointment
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/testResult">
                  <FaBook></FaBook>
                  Test Result
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
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
