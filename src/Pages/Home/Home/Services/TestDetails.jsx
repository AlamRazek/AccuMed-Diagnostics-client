import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../../provider/AuthProvider";

const TestDetails = () => {
  const { user } = useContext(AuthContext);
  const data = useLoaderData();

  const availableSlots = data.slots;

  /*   const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    setCurrentDate(formattedDate);
  }, []); */

  const handleReserve = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold text-center bg-slate-700 text-white py-2 md:py-6 my-2 md:my-6 rounded-lg">
          Test Details
        </h2>
      </div>
      <div className="card  bg-base-100 shadow-xl">
        <figure>
          <img src={data.image} alt="Album" className="max-h-[440px] w-auto" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Name: {data.name}</h2>
          <p>
            <span className="font-semibold text-lg">Details:</span>{" "}
            {data.details}
          </p>

          <div className="card-actions justify-start">
            <p className="font-semibold text-lg">
              Slots-Available:{" "}
              <span className="text-slate-700">{data.slots}.</span>
            </p>
          </div>
          <div>
            <p className="font-semibold text-lg">
              Available Until:{" "}
              <span className="text-slate-600">{data.date}.</span>
            </p>
          </div>
          <div>
            <p className="font-semibold text-lg">
              Price: <span className="text-slate-600">${data.price}.</span>
            </p>
          </div>
          {availableSlots > 0 ? (
            <div className="card-actions justify-center py-2">
              <button className="btn btn-primary w-[50%] text-xl">
                Reserve
              </button>
            </div>
          ) : (
            <div className="card-actions ">
              <button className="btn  disabled">Reserve</button>
              <p className="text-red-500">Not Available*</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestDetails;
