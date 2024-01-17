import BannerImage from "../../AdminDashboard/Banner/BannerImage";
import Swipper from "../SwipperJs/swipper";
import AllTest from "./Services/AllTest";

const Home = () => {
  return (
    <div>
      <div>
        <BannerImage></BannerImage>
      </div>
      <AllTest></AllTest>
      <div>
        <Swipper></Swipper>
      </div>
    </div>
  );
};

export default Home;
