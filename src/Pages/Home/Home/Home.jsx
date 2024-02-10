import BannerImage from "../../AdminDashboard/Banner/BannerImage";
import Promote from "../Promote/Promote";
import Ratings from "../Ratings/ratings";
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
      {/* <div className="my-2 lg:my-4">
        <Ratings></Ratings>
      </div> */}
      <div>
        <Promote></Promote>
      </div>
    </div>
  );
};

export default Home;
