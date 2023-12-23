import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
  const [districts, setDistericts] = useState();
  const [upazilas, setUpazilas] = useState();
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();
  const watchPassword = watch("password", "");

  useEffect(() => {
    fetch("districts.json")
      .then((res) => res.json())
      .then((data) => {
        setDistericts(data);
      });
  }, []);
  useEffect(() => {
    fetch("upazilas.json")
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

  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((res) => {
      const loggedUser = res.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          // create user entry in database
          const userInfo = {
            name: data.name,
            email: data.email,
            bloodGroup: selectedBloodGroup,
            districts: selectedDistrict,
            upazilas: selectedUpazila,
            status: "active",
          };
          console.log(userInfo);
          axiosPublic
            .post("/users", userInfo, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((res) => {
              if (res.data.insertedId) {
                reset();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Register Successful",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
              }
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  return (
    <div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center " data-aos="fade-down">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
        </div>
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
              <label className="label">
                <span className="label-text">photo URL</span>
              </label>
              <input
                type="text"
                {...register("photoURL", { required: true })}
                placeholder="Photo URL"
                className="input input-bordered"
              />
              {errors.photoURL && <span>This field is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                {...register("email", { required: true })}
                className="input input-bordered"
              />
              {errors.email && <span>This field is required</span>}
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
                  <option disabled>Pick one</option>
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
                  <option disabled defaultValue="">
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
                  <option disabled defaultValue>
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                })}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="confirm password"
                name="password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === watchPassword || "password do not match",
                })}
                className="input input-bordered"
              />
              {errors.confirmPassword && (
                <span className="text-red-600">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Sign Up"
                className="btn btn-primary"
              />
            </div>
          </form>
          <p className="p-6 text-center ">
            <small>
              Already Have an account?{" "}
              <Link to="/login">
                Click Here To{" "}
                <span className="text-blue-600 text-lg font-bold">Login</span>
              </Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
