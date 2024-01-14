import useAllReservations from "../../hooks/useAllReservations";

const UpcomingAppointment = () => {
  const appointments = useAllReservations();

  return (
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
          {appointments?.map((data, index) => (
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
  );
};

export default UpcomingAppointment;
