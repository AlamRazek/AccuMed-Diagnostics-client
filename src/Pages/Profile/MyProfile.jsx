import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaBaby, FaWrench } from "react-icons/fa6";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/profile/${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="card w-full bg-base-300 my-4 py-4">
      <figure className="w-[40%] rounded-full mx-auto">
        <img src={user?.photoURL} alt="Movie" />
      </figure>
      <div className="card-body">
        <h2 className="card-title"> {users.name}</h2>
        <p>Blood-Group: {users.bloodGroup}</p>
        <p>Districts: {users.districts}</p>
        <p>Upazilas: {users.upazilas}</p>
        <div className="card-actions justify-end">
          <Link to="/dashboard/updateProfile">
            <button className="btn btn-primary">
              Update <FaWrench></FaWrench>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
