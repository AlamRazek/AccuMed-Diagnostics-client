import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Appointments = ({ data, refetch }) => {
  const { _id, name, email, date, reservationName } = data;
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
        axiosSecure.delete(`/appointment/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Canceled!",
              text: "Your appointment has been canceled.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl my-4">
      <div className="card-body">
        {reservationName?.map((name, index) => (
          <h2 key={index} className="card-title">
            {index + 1}. {name}
          </h2>
        ))}
        <p>Appointment Date: {date}</p>
        <div className="card-actions w-[60%]">
          <button
            className="btn w-[60%] btn-primary"
            onClick={() => handleCancel(_id)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
