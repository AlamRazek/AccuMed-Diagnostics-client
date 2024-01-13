import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useAllReservations = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const { data: resevations = [], refetch } = useQuery({
    queryKey: ["reservation"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reservation/${user.email}`);
      return res.data;
    },
  });
  return { resevations, refetch };
};

export default useAllReservations;
