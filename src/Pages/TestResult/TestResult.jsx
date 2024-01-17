import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Result from "./Result";

const TestResult = () => {
  const axiosSecure = useAxiosSecure();
  const { data: appointments = [] } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/appointment");
      return res.data;
    },
  });

  return (
    <div>
      {appointments.map((data, index) => (
        <Result key={data._id} data={data} index={index}></Result>
      ))}
    </div>
  );
};

export default TestResult;
