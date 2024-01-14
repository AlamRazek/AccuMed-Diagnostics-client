import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

const MyReservations = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const { data: resevations = [], refetch } = useQuery({
    queryKey: ["reservation"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reservation/${user.email}`);
      return res.data;
    },
  });
  const price = resevations?.reduce((total, item) => total + item.price, 0);

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
        axiosPublic.delete(`/reservations/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Canceled!",
              text: "Your reservation has been canceled.",
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
      <p className="font-bold my-2">Total Price: ${price}</p>
      <button className="btn">
        <NavLink to="/dashboard/reservation/payment">pay </NavLink>
      </button>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Test Name</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {resevations?.map((data, index) => (
              <tr key={data._id}>
                <th>{index + 1}</th>
                <td>{data.name}</td>
                <td>{data.name}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleCancel(data._id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyReservations;
