import React, { useEffect, useState } from "react";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import "../Styles/AllDoctors.css";
import { current } from "@reduxjs/toolkit";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  const NavigateTo = useNavigate();

  useEffect(() => {
    const doctor = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          {
            withCredentials: true,
          }
        );
        setDoctors(data.doctors);
        toast.success();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    doctor();
  }, []);

  if (!currentUser) {
    return <Navigate to={"/login"} />;
  }

  const handleAppointment = () => {
    NavigateTo("/appointment");
  };

  return (
    <>
      <section className="page doctors">
        <h1>DOCTORS</h1>
        <ToastContainer position="top-center" />
        <div className="banner">
          {doctors && doctors.length > 0 ? (
            doctors.map((element) => {
              return (
                <div className="card">
                  <img
                    src={element.docAvatar && element.docAvatar}
                    alt="Doctor Avatar"
                  />
                  <h4>{`${element.firstName} ${element.lastName}`}</h4>
                  <div className="details">
                    <p>
                      Email: <span>{element.email}</span>
                    </p>
                    <p>
                      Phone: <span>{element.phone}</span>
                    </p>
                    <p>
                      DOB: <span>{element.dob.substring(0, 10)}</span>
                    </p>
                    <p>
                      Department: <span>{element.doctorDepartment}</span>
                    </p>
                    <p>
                      NIC: <span>{element.nic}</span>
                    </p>
                    <p>
                      Gender: <span>{element.gender}</span>
                    </p>
                    <p>
                      Rating: <span>{element.rating} out of 5</span>
                    </p>
                    <p>
                      Experience: <span>{element.experience} + years</span>
                    </p>
                    <p>
                      Online Fees: <span>₹{element.onlinefees}</span>
                    </p>
                    <p>
                      Offline Fees: <span>₹{element.offlinefees}</span>
                    </p>
                    <p>
                      Hospital: <span>{element.hospital}</span>
                    </p>
                  </div>
                  <button onClick={handleAppointment}>Book Appointment</button>
                </div>
              );
            })
          ) : (
            <h1>No Registered Doctor Found</h1>
          )}
        </div>
      </section>
    </>
  );
};

export default Doctors;
