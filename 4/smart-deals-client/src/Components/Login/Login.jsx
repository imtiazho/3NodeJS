import React from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-8">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-slate-800">Login</h2>
          <p className="text-sm mt-2">
            Don't have an account?{" "}
            <span className="text-primary cursor-pointer hover:underline">
              Register Now
            </span>
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

          <button className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity w-full pointer">
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="divider my-6 text-xs font-bold text-gray-400">OR</div>

        {/* Google Registration */}
        <button className="btn btn-outline w-full border-gray-300 hover:bg-gray-50 hover:text-slate-800 normal-case font-semibold">
          <FcGoogle className="text-2xl mr-2" />
          Sign Up With Google
        </button>
      </div>
    </div>
  );
};

export default Login;
