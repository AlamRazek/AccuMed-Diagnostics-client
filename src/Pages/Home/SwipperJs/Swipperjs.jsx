import React from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Swipperjs = () => {
  const axiosPublic = useAxiosPublic();
  const { data: slider = [] } = useQuery({
    queryKey: ["slider"],
    queryFn: async () => {
      const res = await axiosPublic.get("/slider");
      return res.data;
    },
  });
  return <div></div>;
};

export default Swipperjs;
