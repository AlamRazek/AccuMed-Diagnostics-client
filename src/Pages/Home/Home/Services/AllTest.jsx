import { Link } from "react-router-dom";
import useAllTest from "../../../../hooks/useAllTest";
import TestCard from "./TestCard";

const AllTest = () => {
  const [test] = useAllTest();

  return (
    <div>
      <div className="my-2 py-2 text-2xl lg:text-3xl font-bold text-center bg-violet-800 text-white rounded-md shadow-md">
        Our Most Booked Test
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {test.slice(0, 6)?.map((data) => (
          <TestCard key={data._id} data={data}></TestCard>
        ))}
      </div>
      <div className="text-center py-2 md:my-4">
        <Link to="/allTests">
          <button className="btn font-semibold text-xl">See More </button>
        </Link>
      </div>
    </div>
  );
};

export default AllTest;
