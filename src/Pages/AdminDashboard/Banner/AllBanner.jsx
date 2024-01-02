import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";

const AllBanner = () => {
  const axiosSecure = useAxiosSecure();

  const { data: banners = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/banners");
      return res.data;
    },
  });

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
        axiosSecure.delete(`/banner/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
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
        <div className="flex justify-evenly my-4 shadow-lg py-4">
          <h2 className="text-3xl shadow-lg">All Banners</h2>
          <h2 className="text-3xl shadow-lg">
            Total Banners: {banners.length}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Image</th>
                <th>Title</th>
                <th>Coupon Code</th>
                <th>Coupon rate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((data, index) => (
                <tr key={data._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={data.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </td>
                  <td>{data.title}</td>

                  <td>{data.coupon}</td>
                  <td>{data.rate}%</td>

                  <td>
                    <button
                      onClick={() => handleDelete(data._id)}
                      className="btn  btn-md bg-orange-500"
                    >
                      <FaTrash className="text-white "></FaTrash>
                    </button>
                  </td>

                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllBanner;
