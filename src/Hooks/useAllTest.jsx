import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllTest = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: test = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      const res = axiosPublic.get("/test");
      return res.data;
    },
  });

  return [test, loading, refetch];
};

export default useAllTest;
