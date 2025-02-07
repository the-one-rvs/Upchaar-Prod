import React, { useState, useEffect } from "react";

import Contact from "../components/Contact";
import BackToTop from "../components/BackToTop";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import NavbarF from "../components/NavbarF";

const Appointment = () => {
  const navigateTo = useNavigate();

  const [email, setEmail] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [allergies, setAllergies] = useState("");

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async (req, res) => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/doctors",
        {
          withCredentials: true,
        }
      );
      setDoctors(data.doctors);
    };
    fetchDoctors();
  }, []);
  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      // First, initiate the payment process
      const {
        data: { order },
      } = await axios.post("http://localhost:4000/api/checkout");

      // Then, configure Razorpay options
      const options = {
        key: "rzp_test_0RWxtjyWrFp9xL",
        amount: "55000", // You can dynamically set the amount based on the appointment details if needed
        currency: "INR",
        name: "Programmer",
        description: "RazorPay Payment Done",
        image: "https://example.com/your_logo",
        order_id: order.id,
        callback_url: "http://localhost:4000/api/paymentverification",
        prefill: {
          name: `${firstName} ${lastName}`, // Set patient's name dynamically
          email: email,
          contact: phone,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
        handler: async (response) => {
          // Check if payment is successful
          if (response.razorpay_payment_id) {
            // If payment successful, proceed to schedule the appointment
            const { data } = await axios.post(
              "http://localhost:4000/api/v1/appointment/post",
              {
                firstName,
                lastName,
                email,
                phone,
                nic,
                dob,
                gender,
                appointmentDate,
                appointmentTime,
                department,
                doctor_firstName: doctorFirstName,
                doctor_lastName: doctorLastName,
                address,
                hasVisited: hasVisitedBool,
                height,
                weight,
                bloodType,
                allergies,
              },
              {
                withCredentials: true,
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            toast.success(data.message);
            // Reset form fields after successful appointment scheduling
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setNic("");
            setDob("");
            setGender("");
            setAppointmentDate("");
            setDepartment("");
            setDoctorFirstName("");
            setDoctorLastName("");
            setHasVisited("");
            setAddress("");
            setAppointmentTime("");
            setHeight("");
            setWeight("");
            setAllergies("");
            setBloodType("");
          } else {
            // If payment failed, show an error message
            toast.error("Payment failed. Please try again.");
          }
        },
      };

      // Initialize Razorpay and open payment modal
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      // Handle any errors that occur during the process
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto px-4">
        <div
          className="bg-gradient-to-br from-orange-400 to-green-500 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
          style={{
            background:
              "linear-gradient(135deg, #E67444 0%, #FFFEFD 40%, #FFFEFD 60%, #81C46A 100%)",
          }}
        >
          <h2 className="text-2xl mb-4 text-center font-bold">
            Before booking Appointment with the doctor, help us with your
            details.
          </h2>
          <form onSubmit={handleAppointment}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Your First Name"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Your Last Name"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="mobile"
              >
                Mobile Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="mobile"
                type="number"
                name="mobile"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your Mobile Number"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="mobile"
              >
                NIC
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="mobile"
                type="number"
                name="nic"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
                placeholder="NIC"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="mobile"
              >
                Date of Birth
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="mobile"
                type="date"
                name="mobile"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="Your DOB"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="gender"
              >
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="mobile"
              >
                Appointment Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="mobile"
                type="date"
                name="mobile"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                placeholder="Appointment Date"
              />
            </div>

            <div className="mb-4">
              <select
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  setDoctorFirstName("");
                  setDoctorLastName("");
                }}
              >
                {departmentsArray.map((depart, index) => {
                  return (
                    <option value={depart} key={index}>
                      {depart}
                    </option>
                  );
                })}
              </select>

              <select
                value={`${doctorFirstName} ${doctorLastName}`}
                onChange={(e) => {
                  const [firstName, lastName] = e.target.value.split(" ");
                  setDoctorFirstName(firstName);
                  setDoctorLastName(lastName);
                }}
                disabled={!department}
              >
                <option value="">Select Doctor</option>
                {doctors
                  .filter((doctor) => doctor.doctorDepartment === department)
                  .map((doctor, index) => (
                    <option
                      value={`${doctor.firstName} ${doctor.lastName}`}
                      key={index}
                    >
                      {doctor.firstName} {doctor.lastName}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="gender"
              >
                Appointment Time
              </label>

              <select
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
              >
                <option value="">Appointment Time</option>
                <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
                <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="gender"
              >
                Address
              </label>

              <textarea
                rows={10}
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Have you visited the doctor before?
              </label>
              <input
                type="checkbox"
                id="visitedBefore"
                name="visitedBefore"
                checked={hasVisited}
                onChange={(e) => setHasVisited(e.target.checked)}
              />
            </div>

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

            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                GET APPOINTMENT
              </button>
            </div>
            {/* <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={checkoutHandler}
              >
                PAY FEES
              </button>
            </div> */}
          </form>
        </div>
      </div>

      <Contact />
      <BackToTop />
    </>
  );
};

export default Appointment;
