import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
    const handleRegister = (e) => {
    e.preventDefault();
    // Handle registration logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl p-10 border border-blue-200 border-dashed">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800">Register Now!</h2>
          <p className="text-sm mt-2 text-gray-600">
            Already have an account?{' '}
            <span className="text-[#9F62F2] font-semibold cursor-pointer hover:underline">
              Login Now
            </span>
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name Field */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-bold text-gray-700">Name</span>
            </label>
            <input
              type="text"
              placeholder="Mariam Swarna"
              className="input input-bordered w-full focus:outline-none focus:border-[#632EE3]"
              required
            />
          </div>

          {/* Email Field */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-bold text-gray-700">Email</span>
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="input input-bordered w-full focus:outline-none focus:border-[#632EE3]"
              required
            />
          </div>

          {/* Image-URL Field */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-bold text-gray-700">Image-URL</span>
            </label>
            <input
              type="url"
              placeholder="https://image-link.com"
              className="input input-bordered w-full focus:outline-none focus:border-[#632EE3]"
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-bold text-gray-700">Password</span>
            </label>
            <input
              type="password"
              placeholder="************"
              className="input input-bordered w-full focus:outline-none focus:border-[#632EE3]"
              required
            />
          </div>

          {/* Gradient Register Button */}
          <button className="btn w-full border-none text-white text-lg normal-case bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:opacity-90 transition-opacity mt-2">
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="divider my-8 text-xs font-bold text-gray-500">OR</div>

        {/* Google Registration */}
        <button className="btn btn-outline w-full border-gray-300 hover:bg-gray-50 hover:text-slate-800 normal-case font-semibold">
          <FcGoogle className="text-2xl mr-2" />
          Sign Up With Google
        </button>
      </div>
    </div>
  );
};

export default Register;