import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate } from "react-router-dom";
import useAllUser from "../hooks/useAllUser";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PrivateRoutes = ({ children }) => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);

  const { data: userData = [] } = useQuery({
    queryKey: [user?.email, "users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  /*   if (!userData?.user) {
    return <Navigate to="/login" replace></Navigate>;
  } */

  if (loading) {
    return "loading";
  }
  if (user) {
    return children;
  }

  return <Navigate to="/login" replace></Navigate>;
};

export default PrivateRoutes;
