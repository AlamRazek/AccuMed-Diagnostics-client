import { FaPen, FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";

import useAllTest from "../../../hooks/useAllTest";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const AdminTestTable = ({ data }) => {
  const { name, price, image, _id } = data;
  const [, , refetch] = useAllTest();

  const axiosSecure = useAxiosSecure();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/test/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={image} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{name}</div>
                  </div>
                </div>
              </td>

              <td>
                <button
                  onClick={() => handleDelete(_id)}
                  className="btn btn-error btn-xs"
                >
                  <FaTrash></FaTrash>
                  Delete
                </button>
              </td>
              <td>
                <Link to={`/dashboard/updateTest/${_id}`}>
                  <button className="btn btn-success btn-xs ">
                    Update <FaPen></FaPen>
                  </button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTestTable;
