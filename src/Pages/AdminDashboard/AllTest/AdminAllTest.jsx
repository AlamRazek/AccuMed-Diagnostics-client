import useAllTest from "../../../hooks/useAllTest";
import AdminTestTable from "./AdminTestTable";

const AdminAllTest = () => {
  const [test, , refetch] = useAllTest();

  return (
    <div className="">
      <div>
        <h2 className="font-bold text-2xl text-center underline py-2 md:py-4 my-2 md:my-4 bg-slate-400">
          {" "}
          All Test
        </h2>
      </div>
      {test?.map((data) => (
        <AdminTestTable
          key={data._id}
          data={data}
          refetch={refetch}
        ></AdminTestTable>
      ))}
    </div>
  );
};

export default AdminAllTest;
