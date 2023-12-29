import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllTest = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: tests = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      const res = await axiosPublic.get("/test");
      return res.data;
    },
  });

  return [tests, loading, refetch];
};

export default useAllTest;
