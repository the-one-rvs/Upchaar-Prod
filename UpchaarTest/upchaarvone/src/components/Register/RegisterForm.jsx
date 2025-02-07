import React, { useState } from "react";
import { Link } from "react-router-dom";
import OtpModal from "../../helper/OtpModal.jsx";
import axios from "axios";

// Component for loading spinner
const Spinner = () => (
  <div className="w-5 h-5 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
);

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    gender: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const [otp, setOtp] = useState("");
  const [isOtpModalOpen, setOtpModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (id === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (value) => {
    const minLength = 6;
    const hasSpecialChar = /[@#$&]/.test(value);
    const hasNumber = /\d/.test(value);

    if (value.length < minLength) {
      setPasswordError("Password must be at least 6 characters long");
    } else if (!hasSpecialChar) {
      setPasswordError(
        "Password must contain at least one special character (@, #, $, &)."
      );
    } else if (!hasNumber) {
      setPasswordError("Password must contain at least one number.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    if (passwordError) return;

    try {
      const res = await fetch("api/auth/patient/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      setLoading(false);
      if (data) {
        setOtpModalOpen(true);
        setSuccessMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("api/auth/patient/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp,
          password: formData.password,
        }),
      });
      console.log(formData.email, otp, formData.password);
      const data = await res.json();
      setLoading(false);

      if (data) {
        setSuccessMessage(
          "OTP verified successfully!, Registration Successful"
        );
        setOtpModalOpen(false);
        setTimeout(() => {
          clearForm();
        }, 5000);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage("Failed to verify OTP. Please try again.");
    }
  };

  const cancelRegistration = async () => {
    try {
      await axios.post("/api/auth/patient/cancel-registration", {
        email: formData.email,
      });

      setErrorMessage("Registration cancelled by user, Kindly Try Again");
    } catch (error) {
      console.error("Failed to cancel registration:", error);
    }
  };

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      dob: "",
      gender: "",
    });
    setOtp(""); // Clear OTP field
    setSuccessMessage("");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-4">
      <div
        className="max-w-lg w-full bg-gradient-to-br from-orange-400 to-green-500 shadow-lg rounded-lg px-8 pt-6 pb-8"
        style={{
          background:
            "linear-gradient(135deg, #E67444 0%, #FFFEFD 40%, #FFFEFD 60%, #81C46A 100%)",
        }}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Fill in your details for Registration
        </h2>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-600 text-bold">{successMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="grid gap-6">
          <input
            type="text"
            placeholder="Full Name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          {passwordError && (
            <p className="text-red-500 text-center text-sm">{passwordError}</p>
          )}
          <div className="grid gap-2">
            <label
              htmlFor="phone"
              className="text-sm text-gray-700 font-semibold"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Only Indian Mobile Number"
              maxLength={10}
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="dob"
              className="text-sm text-gray-700 font-semibold"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="gender"
              className="text-sm text-gray-700 font-semibold"
            >
              Gender
            </label>
            <select
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Transgender">Transgender</option>
              <option value="Other">Can't specify, others</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full p-3 mt-2 text-white bg-blue-400 rounded hover:bg-blue-500"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <div className="mt-4 text-center">
            {successMessage && (
              <p className="text-green-600 text-2xl text-bold">
                {successMessage}
              </p>
            )}
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* OTP Modal */}
      <OtpModal
        isOpen={isOtpModalOpen}
        onClose={() => {
          setOtpModalOpen(false); // Close the modal
          cancelRegistration();
          clearForm();
        }}
        setOpen={setOtpModalOpen}
        email={formData.email}
        otp={otp}
        setOtp={setOtp}
        isLoading={loading}
        errorMessage={errorMessage}
        successMessage={successMessage}
        handleOtpSubmit={handleOtpSubmit}
      />
    </div>
  );
};

export default Register;
