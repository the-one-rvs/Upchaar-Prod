import React, { useState } from "react";
import NavbarLogin from "../components/Login/NavbarLogin";
import "../Styles/ApplyDoctor.css";
import Contact from "../components/Contact";
import BackToTop from "../components/BackToTop";

const ApplyDoctor = () => {
  const [doctorInfo, setDoctorInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    specialty: "",
    consultationFees: "",
    yearsOfExperience: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if any required field is empty
    for (const key in doctorInfo) {
      if (doctorInfo.hasOwnProperty(key) && doctorInfo[key] === "") {
        alert("Please fill in all required fields.");
        return; // Exit function early if any required field is empty
      }
    }
    // Here you can add code to submit the doctorInfo to your backend or handle it as needed
    console.log("Doctor Info:", doctorInfo);
  };

  return (
    <>
      <NavbarLogin />
      <div className="apply-doctor-container">
        <div className="card-body">
          <h2 className="card-title">Apply as a Doctor</h2>
          <form onSubmit={handleSubmit}>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                placeholder="Your first name here"
                value={doctorInfo.firstName}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                placeholder="Your last name here"
                value={doctorInfo.lastName}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={doctorInfo.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Phone Number:
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Number starting with +91"
                value={doctorInfo.phoneNumber}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Specialty:
              <input
                type="text"
                name="specialty"
                placeholder="e.g. ENT,Cardiology,Neurology,etc"
                value={doctorInfo.specialty}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Consultation Fees:
              <input
                type="number"
                name="consultationFees"
                placeholder="Fees in INR"
                value={doctorInfo.consultationFees}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Years of Experience:
              <input
                type="number"
                name="yearsOfExperience"
                placeholder="Enter only numeric value of experience"
                value={doctorInfo.yearsOfExperience}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <button type="submit">Apply</button>
          </form>
        </div>
      </div>
      <Contact />
      <BackToTop />
    </>
  );
};

export default ApplyDoctor;
