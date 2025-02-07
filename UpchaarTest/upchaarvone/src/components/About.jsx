import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getImageUrl } from "../utils.js";
import {
  ArrowRightIcon,
  ChatIcon,
  CalendarIcon,
  SearchIcon,
} from "@heroicons/react/solid"; // Importing icons
import "./About.css";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const About = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const LoggedInUser = useSelector((state) => state.Agent.LoggedInUser);

  return (
    <>
      <div
        className="flex justify-center items-center text-4xl font-bold text-orange-500 mt-6"
        style={{ paddingTop: "23.0rem" }}
      ></div>
      {/* Cards - offer */}
      <div className="container mx-auto px-4 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Virtual Vaidhya Card */}
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="p-6 bg-gradient-to-br from-orange-400 to-green-500 shadow-md rounded-lg overflow-hidden max-w-xs mb-4"
            style={{
              background:
                "linear-gradient(135deg, #E67444 0%, #FFFEFD 40%, #FFFEFD 60%, #81C46A 100%)",
            }}
          >
            <img
              src={getImageUrl("About/virtualvaidya.png")}
              className="mx-auto mb-4 w-[60px]"
              alt="Virtual Vaidhya"
            />
            <h2 className="text-xl font-bold text-black text-center mb-4">
              VIRTUAL VAIDHYA - CHAT BOT
            </h2>
            <p className="text-sm font-semibold font-output leading-relaxed text-orange-700 mb-4">
              The Virtual Vaidhya is a digital doctor available online. It uses
              AI to understand symptoms, offer diagnoses, and give personalized
              advice through text.
            </p>
            <a href="/virtualvaidhya">
              {LoggedInUser && (
                <button className="bg-blue-300 text-white font-semibold py-1 px-2 rounded-full hover:bg-blue-500 transition duration-200 flex items-center justify-center">
                  <ChatIcon className="w-4 h-4 mr-2" /> Start a Chat
                </button>
              )}
            </a>
          </motion.div>

          {/* Osteoarthritis X-Ray Review Card */}
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-orange-400 to-green-500 shadow-md rounded-lg overflow-hidden p-5 max-w-xs mb-4"
            style={{
              background:
                "linear-gradient(135deg, #E67444 0%, #FFFEFD 40%, #FFFEFD 60%, #81C46A 100%)",
            }}
          >
            <img
              src={getImageUrl("About/x-ray.png")}
              className="mx-auto mb-4 w-[70px] h-[80px]"
              alt="Experienced Doctors"
            />
            <h2 className="text-xl font-bold text-black text-center mb-4">
              OSTEOARTHRITIS X-RAY REVIEW
            </h2>
            <p className="text-sm font-semibold font-output leading-relaxed text-orange-700 mb-4">
              Osteoarthritis is a degenerative joint disease, in which the
              tissues in the joint break down over time. Scan your X-Ray image
              to confirm the presence of Osteoarthritis.
            </p>
            <a href="https://upchaar-osteoarthritis-x-ray-reader.onrender.com/">
              {LoggedInUser && (
                <button className="bg-blue-300 text-white font-semibold py-1 px-2 rounded-full hover:bg-blue-500 transition duration-200 flex items-center justify-center">
                  <ArrowRightIcon className="w-4 h-4 mr-2" /> Scan X-Ray Image
                </button>
              )}
            </a>
          </motion.div>

          {/* Scan Review Card */}
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-orange-400 to-green-500 shadow-md rounded-lg overflow-hidden p-5 max-w-xs mb-4"
            style={{
              background:
                "linear-gradient(135deg, #E67444 0%, #FFFEFD 40%, #FFFEFD 60%, #81C46A 100%)",
            }}
          >
            <img
              src={getImageUrl("About/scan.png")}
              className="mx-auto mb-4 w-[60px]"
              alt="AI Scan Review"
            />
            <h2 className="text-xl font-bold text-black text-center mb-4">
              SCAN REVIEW
            </h2>
            <p className="text-sm font-semibold font-output leading-relaxed text-orange-700 mb-4">
              The AI scanner is a feature that automatically extracts
              information and analyzes uploaded blood reports using artificial
              intelligence algorithms.
            </p>
            <a href="https://upchaar-medical-test-report.onrender.com/">
              {LoggedInUser && (
                <button className="bg-blue-300 text-white font-semibold py-1 px-2 rounded-full hover:bg-blue-500 transition duration-200 flex items-center justify-center">
                  <SearchIcon className="w-4 h-4 mr-2" /> Scan your report
                </button>
              )}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Trusted Section */}
      <div className="flex justify-center items-center text-5xl  font-bold text-orange-500 py-8 max-md:text-3xl">
        <span className="border-b-2 border-blue-500 font-bold">
          We Are Trusted
        </span>
      </div>
      {/* Review Cards Carousel */}
      <div className="py-10">
        <Slider {...settings} className="review-carousel">
          <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] bg-white shadow-md rounded-lg p-5  mb-5">
            <p className="text-sm text-gray-700">
              "Awesome website! Nice Doctors, very friendly UI experience. I
              recommend Upchaar to my friends and family."
            </p>
            <p className="mt-4 text-xs text-gray-600">- Geeta</p>
          </div>
          <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] bg-white shadow-md rounded-lg p-5  mb-5">
            <p className="text-sm text-gray-700">
              "Dr. Varun is such a nice doctor to consult, he helped me cure my
              acne and pimples in just a few months. I will visit Upchaar
              again."
            </p>
            <p className="mt-4 text-xs text-gray-600">- Vaibhav</p>
          </div>
          <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] bg-white shadow-md rounded-lg p-5  mb-5">
            <p className="text-sm text-gray-700">
              "The scan review feature is very easy to use. The results are very
              accurate and helpful in diagnosing."
            </p>
            <p className="mt-4 text-xs text-gray-600">- Yashi</p>
          </div>
          <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] bg-white shadow-md rounded-lg p-5  mb-5">
            <p className="text-sm text-gray-700">
              "The scan review feature is very easy to use. The results are very
              accurate and helpful in diagnosing."
            </p>
            <p className="mt-4 text-xs text-gray-600">- Yashi</p>
          </div>
        </Slider>
      </div>
    </>
  );
};

export default About;
