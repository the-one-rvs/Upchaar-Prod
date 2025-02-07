import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/api/v1/message/send",
          { firstName, lastName, phone, email, message },
          {
            withCredentials: true,
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setMessage("");
        });
    } catch (error) {
      toast.error(error.res.data.message);
    }
  };

  return (
    <footer id="contact">
      <div className="mt-14 pt-4">
        <div className="font-output tracking-wider text-2xl pl-7 max-md:text-xl">
          MAKE US BETTER
        </div>
        <div className="font-output tracking-wider text-orange-500 font-semibold text-5xl pl-7 max-md:text-3xl">
          Suggest Us Improvements
        </div>
        <div className="flex flex-col md:flex-row mt-8 mb-4">
          {/* Contact card */}
          <div
            className=" rounded-lg w-full md:w-1/2 p-6 pr-10 ml-0 md:ml-10 mb-8 md:mb-0 from-orange-400 h-3/4 to-green-500 bg-white shadow-md overflow-hidden "
            style={{
              background:
                "linear-gradient(135deg, #E67444 0%, #FFFEFD 40%, #FFFEFD 60%, #81C46A 100%)",
            }}
          >
            <h2 className=" text-3xl font-bold text-login mb-4">Contact Us</h2>
            {/* <p className="text-lg font-bold text-black-800">+0120-568911</p> */}
            <p className="text-lg font-bold text-black-800">help@upchaar.com</p>
            <p className="text-lg font-bold  text-black-800">
              UPCHAAR HQ, D-BLOCK, Sector 58
              <p className="text-lg text-black-800">Noida, INDIA - 201301</p>
            </p>
            {/* Google Maps */}
            <div className="mt-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1751.3530278878827!2d77.35672604237614!3d28.608593799999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce56b7ac342e3%3A0x26f58228bc09c8d4!2sD53%2C%20Bishanpura%20Rd%2C%20Near%20Yash%20Memorial%20School%2C%20Bishanpura%2C%20Sector%2058%2C%20Noida%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sin!4v1734004273754!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                title="Google Maps"
              ></iframe>
            </div>

            {/* Social icons */}
            <div className="flex pt-5 mt-4">
              {/* <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-4 text-gray-500 hover:text-gray-800 transition duration-300"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-4 text-gray-500 hover:text-gray-800 transition duration-300"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-4 text-gray-500 hover:text-gray-800 transition duration-300"
              >
                <FaLinkedin className="w-6 h-6" />
              </a> */}
            </div>
          </div>
          {/* Message form */}
          <div
            className="bg-gray-100  w-full md:w-1/2 rounded-lg p-6 ml-0 md:ml-8  from-orange-400 mb-4 to-green-500 bg-white shadow-md overflow-hidden "
            style={{
              background:
                "linear-gradient(135deg, #E67444 0%, #FFFEFD 40%, #FFFEFD 60%, #81C46A 100%)",
            }}
          >
            <h2 className="text-3xl font-bold text-login ">
              Let's Get in touch
            </h2>
            <h2 className="text-xl font-bold text-login ">
              Send Review or Feedback
            </h2>
            <form className="pr-5" onSubmit={handleMessage}>
              <div className="mb-4 ">
                <label
                  className="block text-black-700 text-sm font-bold mb-2"
                  htmlFor="First Name"
                >
                  First Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="mb-4 ">
                <label
                  className="block text-black-700 text-sm font-bold mb-2"
                  htmlFor="Last Name"
                >
                  Last Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-black-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-black-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="number"
                  type="number"
                  placeholder="Your Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-black-700 text-sm font-bold mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="message"
                  rows="5"
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="sumbit"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
