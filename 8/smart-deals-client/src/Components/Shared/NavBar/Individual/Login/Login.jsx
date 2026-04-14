import React, { use } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../../../../../../../../2-react-second-phase/5-practice-whole-milestone/react-auth-router/src/Context/AuthContext";

const Login = () => {
  const { googleSignIn, signIn } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        console.log(res);
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then((res) => {
        console.log(res);
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-8">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-slate-800">Login</h2>
          <p className="text-sm mt-2">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="text-primary cursor-pointer hover:underline"
            >
              Register Now
            </Link>
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className="input input-bordered w-full focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="************"
              className="input input-bordered w-full focus:outline-none focus:border-primary"
              required
            />
            <label className="label mt-1">
              <span className="label-text-alt link link-hover text-gray-400">
                Forgot password?
              </span>
            </label>
          </div>

          <button className="btn btn-primary w-full text-white normal-case text-lg">
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="divider my-6 text-xs font-bold text-gray-400">OR</div>

        {/* Social Login */}
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline w-full border-gray-300 hover:bg-gray-50 hover:text-slate-800 normal-case font-semibold"
        >
          <FcGoogle className="text-xl mr-2" />
          Sign In With Google
        </button>
      </div>
    </div>
  );
};

export default Login;
