import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import ReservationCard from "./reservationCard";

const Reservations = () => {
  const axiosPublic = useAxiosPublic();

  const { data: reservations = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/reservations");
      return res.data;
    },
  });

  return (
    <div>
      {reservations?.map((data, index) => (
        <ReservationCard
          key={data._id}
          data={data}
          index={index}
          refetch={refetch}
        ></ReservationCard>
      ))}
    </div>
  );
};

export default Reservations;
