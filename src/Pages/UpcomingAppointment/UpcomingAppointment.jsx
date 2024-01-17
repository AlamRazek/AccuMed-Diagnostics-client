import { useQuery } from "@tanstack/react-query";
import useAllReservations from "../../hooks/useAllReservations";
import Appointments from "./Appoinments";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpcomingAppointment = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: appointments = [], refetch } = useQuery({
    queryKey: ["appointments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
      {appointments ? (
        appointments?.map((data) => (
          <Appointments
            key={data._id}
            data={data}
            refetch={refetch}
          ></Appointments>
        ))
      ) : (
        <p>No Appointment</p>
      )}
    </div>
  );
};

export default UpcomingAppointment;
