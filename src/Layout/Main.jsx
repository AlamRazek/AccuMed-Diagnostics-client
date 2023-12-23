import { Outlet } from "react-router-dom";
import Footer from "../Pages/Home/Home/Shared/Footer/Footer";
import NavBar from "../Pages/Home/Home/Shared/Footer/NavBar/NavBar";
import { ToastContainer } from "react-toastify";

const Main = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="max-w-7xl mx-auto my-2">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
};

export default Main;
