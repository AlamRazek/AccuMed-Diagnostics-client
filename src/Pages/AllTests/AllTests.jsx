import { useEffect, useState } from "react";
import useAllTest from "../../hooks/useAllTest";
import TestCards from "./TestCards";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllTests = () => {
  const [test] = useAllTest();
  const [currentDate, setCurrentDate] = useState("");
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [filterTest, setFilterTest] = useState(test);
  const axiosPublic = useAxiosPublic();
  const totalTest = test.length;
  const itemsPerPage = 9;
  const numberOfPages = Math.ceil(totalTest / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];
  const [currentPage, setCurrentPage] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/test?page=${currentPage}&size=${itemsPerPage}`)
      .then((res) => res.json())
      .then((data) => setFilterTest(data));
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    setCurrentDate(formattedDate);
  }, [currentDate]);

  useEffect(() => {
    const filterTest = test.filter((data) => data.date > currentDate);
    setFilterTest(filterTest);
  }, [test, currentDate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSearch = async () => {
    const responseData = await axiosPublic.get(`/testDate/${selectedDate}`);
    console.log(responseData.data);
    setFilterTest(responseData.data);
  };

  return (
    <div>
      <label>
        Select Date:
        <input
          type="date"
          defaultValue={currentDate}
          onChange={handleDateChange}
        />
        <button className="btn btn-sm mx-2" onClick={handleSearch}>
          Search
        </button>
      </label>
      <div className="my-2 py-2 text-2xl lg:text-3xl font-bold text-center bg-violet-800 text-white rounded-md shadow-md">
        All The Available Test
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {filterTest?.map((data) => (
          <TestCards key={data._id} data={data}></TestCards>
        ))}
      </div>
      <div className="text-center my-2">
        <p>Current page: {currentPage}</p>
        {pages.map((page) => (
          <div className="join " key={page}>
            <input
              onClick={() => setCurrentPage(page)}
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label={page.toString()}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTests;
