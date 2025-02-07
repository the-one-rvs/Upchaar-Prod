import React, { useState } from "react";
import Contact from "../components/Contact";
import BackToTop from "../components/BackToTop";
import NavbarLogin from "../components/Login/NavbarLogin";

const UserDetails = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("male"); // Default value
  const [bloodType, setBloodType] = useState(""); // Default value
  const [allergies, setAllergies] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, like sending data to a server
    console.log("Submitted:", { height, weight, gender, bloodType, allergies });
  };
  const handleClear = () => {
    setHeight("");
    setWeight("");
    setGender("male");
    setBloodType("");
    setAllergies("");
  };
  return (
    <div>
      <NavbarLogin />
      <div
        className="max-w-md mx-auto  bg-gradient-to-br from-orange-400 to-green-500 bg-white shadow-md rounded-lg overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #E67444 0%, #FFFEFD 40%, #FFFEFD 60%, #81C46A 100%)",
        }}
      >
        <div className="p-6 md:p-10">
          <h2 className="text-2xl font-semibold text-login mb-6 lg:mb-8">
            Enter Your Health Details
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 lg:mb-6">
              <label
                htmlFor="height"
                className="block text-gray-700 font-semibold mb-2"
              >
                Height (cm)
              </label>
              <input
                type="number"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="mb-4 lg:mb-6">
              <label
                htmlFor="weight"
                className="block text-gray-700 font-semibold mb-2"
              >
                Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="mb-4 lg:mb-6">
              <span className="block text-gray-700 font-semibold mb-2">
                Gender
              </span>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="male"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                  className="form-radio h-5 w-5 text-blue-500"
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                  className="form-radio h-5 w-5 text-blue-500"
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
            <div className="mb-4 lg:mb-6">
              <label
                htmlFor="bloodType"
                className="block text-gray-700 font-semibold mb-2"
              >
                Blood Type
              </label>
              <select
                id="bloodType"
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="mb-4 lg:mb-6">
              <label
                htmlFor="allergies"
                className="block text-gray-700 font-semibold mb-2"
              >
                Allergies
              </label>
              <textarea
                id="allergies"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300 mb-4 lg:mb-6 mr-4"
            >
              Save Details
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="w-full bg-red-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300 mb-4 lg:mb-6"
            >
              Clear All Details
            </button>
          </form>
        </div>
      </div>
      <Contact />;
      <BackToTop />
    </div>
  );
};

export default UserDetails;