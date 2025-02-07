import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const Spinner = () => (
    <div className="spinner border-2 border-green-500 rounded-full w-4 h-6 animate-spin"></div>
  );

  const from = location.state?.from?.pathname || "/";

  const redirectPath =
    new URLSearchParams(location.search).get("redirect") || "/features";

  const handleLoginSuccess = () => {
    // After successful login logic
    navigate(redirectPath); // Redirect to the intended page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const submissionData = { email, password };
      dispatch(signInStart());
      const res = await fetch("/api/auth/patient/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        setLoading(false);
        dispatch(signInFailure(data.message || "Login failed"));
        enqueueSnackbar(data.message || "An error occurred", {
          variant: "error",
        });
        return;
      }

      dispatch(signInSuccess(data));

      enqueueSnackbar("You have been logged in successfully.", {
        variant: "success",
      });
      // toast.success("You have been logged in successfully.");
      setTimeout(() => handleLoginSuccess(), 4000);
    } catch (error) {
      dispatch(signInFailure(error.message));
      enqueueSnackbar(error.message || "Something went wrong", {
        variant: "error",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div
          className="bg-gradient-to-br from-orange-400 to-green-500 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
          style={{
            background:
              "linear-gradient(135deg, #E67444 0%, #FFFEFD 40%, #FFFEFD 60%, #81C46A 100%)",
          }}
        >
          <h2 className="text-2xl font-semibold text-login mb-6 lg:mb-8">
            Login to your account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6 lg:mb-8">
              <label
                htmlFor="username"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="text"
                id="username"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="mb-6 lg:mb-8">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300 mb-4 lg:mb-6 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Spinner />
                  <span className="ml-2">Signing into UPCHAAR...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
            <h3 className="text-sm text-gray-700 mb-4 lg:mb-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </h3>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
