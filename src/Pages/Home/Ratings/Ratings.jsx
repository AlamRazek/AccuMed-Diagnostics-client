import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import RatingData from "./ratingData";

const Ratings = () => {
  const axiosPublic = useAxiosPublic();
  const { data: ratings = [] } = useQuery({
    queryKey: ["rating"],
    queryFn: async () => {
      const res = await axiosPublic.get("/ratings");
      return res.data;
    },
  });

  return (
    <div>
      {ratings.map((data) => (
        <RatingData key={data._id} data={data}></RatingData>
      ))}
    </div>
  );
};

export default Ratings;
