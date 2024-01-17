import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Banner from "./banner";

const BannerImage = () => {
  const axiosSecure = useAxiosSecure();
  const { data: banners = [] } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/banners");
      return res.data;
    },
  });

  return (
    <div>
      {banners?.map((data) => (
        <Banner key={data._id} data={data}></Banner>
      ))}
    </div>
  );
};

export default BannerImage;
