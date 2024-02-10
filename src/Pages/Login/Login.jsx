import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const notify1 = () => toast("Successfully Logged in");
  const notify2 = (err) => toast(err);

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        notify1();
        console.log(res);
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        notify2(err.message);
        console.log(err.message);
      });
  };

  /*   const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        notify1();
        console.log(res);
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        // notify2(err.message);
        console.log(err.message);
        console.log(err);
      });
  }; */

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const loggedInUser = result?.user;
        console.log(loggedInUser);

        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.log(error.message);
        // setError(error.message);
        notify2(error.message);
      });
  };

  return (
    <div>
      <div data-aos="fade-down">
        <h2 className="text-2xl text-center my-2 md:my-6 lg:my-6 font-semibold">
          Please Login
        </h2>
      </div>

      <form
        className="card-body md:w-3/4 lg:w-1/2 mx-auto"
        onSubmit={handleLogin}
        data-aos="fade-up"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="input input-bordered"
            required
          />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      <div className="text-center ">
        <button className="btn btn-accent " onClick={handleGoogleSignIn}>
          Google login
        </button>
      </div>
      <div>
        {/* {errors ? <span className="text-red-700">{errors.message}</span> : ""} */}
      </div>
      <p className="text-center pb-3 px-3 md:pb-6 md:px-6">
        Do not have an account? please{" "}
        <Link className="font-bold text-blue-800 underline" to={"/signUp"}>
          SignUp
        </Link>
      </p>
      <ToastContainer />
    </div>
  );
};

export default Login;
