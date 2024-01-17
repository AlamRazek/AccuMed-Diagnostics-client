import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ReservationCard = ({ data, index, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/appointmentResult/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Reservation Canceled.",
              text: "Your reservation has been canceled.",
              icon: "success",
            });
          }
          refetch();
        });
      }
    });
  };

  const handleSubmit = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/appointmentResult/${id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Submitted!",
              text: "This report has been delivered.",
              icon: "success",
            });
          }
          refetch();
        });
      }
    });
  };

  return (
    <div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Reserved By:</th>
                <th>Action</th>
                <th>Report Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>{index + 1}</th>
                <td className="font-bold">
                  {" "}
                  {data.reservationName?.map((name, index) => (
                    <h2 key={index} className="card-title">
                      {index + 1}. {name}
                    </h2>
                  ))}
                </td>
                <td>{data.email}</td>
                <td>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleCancel(data._id)}
                  >
                    Cancel
                  </button>
                </td>
                <td>
                  {data.reportStatus === "pending" ? (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleSubmit(data._id)}
                    >
                      Submit
                    </button>
                  ) : (
                    <p className="font-bold text-green-800 text-lg">
                      Delivered
                    </p>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
