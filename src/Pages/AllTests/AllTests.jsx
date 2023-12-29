import useAllTest from "../../hooks/useAllTest";
import TestCards from "./TestCards";

const AllTests = () => {
  const [test] = useAllTest();

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {test?.map((data) => (
          <TestCards key={data._id} data={data}></TestCards>
        ))}
      </div>
    </div>
  );
};

export default AllTests;
