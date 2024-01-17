import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";

import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";

const UpdateProfile = () => {
  const [districts, setDistericts] = useState();
  const [upazilas, setUpazilas] = useState();
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => {
        setDistericts(data);
      });
  }, []);
  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        setUpazilas(data);
      });
  }, []);

  const handleBloodGroup = (event) => {
    setSelectedBloodGroup(event.target.value);
    console.log(event.target.value);
  };
  const handleDistrict = (event) => {
    setSelectedDistrict(event.target.value);
    console.log(event.target.value);
  };
  const handleUpazila = (event) => {
    setSelectedUpazila(event.target.value);
    console.log(event.target.value);
  };

  const onSubmit = async (data) => {
    // create user entry in database
    const userInfo = {
      name: data.name,
      bloodGroup: selectedBloodGroup,
      districts: selectedDistrict,
      upazilas: selectedUpazila,
    };

    const userRes = await axiosPublic.patch(
      `/users/update/${user.email}`,
      userInfo
    );
    console.log(userRes.data);
    if (userRes.data.modifiedCount > 0) {
      reset();
      // show success popup
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: ` updated successfully `,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <div className="text-2xl font-bold text-center my-2">
        Update User Profile
      </div>
      <div className="hero-content flex-col ">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form
            className="card-body"
            onSubmit={handleSubmit(onSubmit)}
            data-aos="fade-up"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Name"
                name="name"
                className="input input-bordered"
              />
              {errors.name && <span>This field is required</span>}
            </div>

            <div className="form-control">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Blood Group</span>
                </div>
                <select
                  className="select select-bordered"
                  onChange={handleBloodGroup}
                >
                  <option disabled selected>
                    Pick one
                  </option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
              </label>
            </div>
            <div className="form-control">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">District</span>
                </div>
                <select
                  className="select select-bordered"
                  onChange={handleDistrict}
                >
                  <option disabled selected>
                    Pick one
                  </option>
                  {districts?.map((data) => (
                    <option key={data.id} value={data.name}>
                      {data.name}/{data.bn_name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form-control">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Upazila</span>
                </div>
                <select
                  className="select select-bordered"
                  onChange={handleUpazila}
                >
                  <option disabled selected>
                    Pick one
                  </option>
                  {upazilas?.map((data) => (
                    <option key={data.id} value={data.name}>
                      {data.name}/{data.bn_name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="form-control mt-6">
              <input type="submit" value="Update" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
