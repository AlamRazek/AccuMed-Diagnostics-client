import { Preview, print } from "react-html2pdf";
const Result = ({ data }) => {
  return (
    <div>
      <div
        id="pdf-content"
        className="card  bg-base-100 shadow-xl p-2 md:p-4 px-2 my-2 md:my-4"
      >
        <Preview id={"jsx-template"}>
          <div>
            {data.reservationName?.map((name, index) => (
              <h2 key={index} className="card-title">
                {index + 1}.Name: {name}
              </h2>
            ))}
          </div>
          <div>
            {data.reservations?.map((name, index) => (
              <h2 key={index} className="card-title">
                Date: {name.date}
              </h2>
            ))}
          </div>
          <div>
            {" "}
            {data.reservations?.map((name) => (
              <h2 key={name._id} className="card-title">
                Details: {name.details}
              </h2>
            ))}
          </div>
        </Preview>
      </div>
      <button
        className="btn btn-primary"
        onClick={() => print("a", "jsx-template")}
      >
        {" "}
        Download Result
      </button>
    </div>
  );
};

export default Result;
