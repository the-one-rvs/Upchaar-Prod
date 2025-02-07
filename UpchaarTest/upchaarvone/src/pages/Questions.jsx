import React from "react";
import NavbarLogin from "../components/Register/NavbarRegister";
import "../Styles/Questions.css";
import Contact from "../components/Contact";
import BackToTop from "../components/BackToTop";
import Footer from "../components/Footer";

const Questions = () => {
  return (
    <>
      <div>
        <NavbarLogin />
        <div className="container">
          <div className="question-container">
            <h2 className="font-bold text-lg pb-2">
              What services does your website offer?
            </h2>
            <p>
              Our website offers online doctor booking, Virtual Vaidhya chatbot
              consultations, and blood report AI analysis.
            </p>
          </div>
          <div className="question-container">
            <h2 className="font-bold text-lg pb-2">
              How do I book an appointment with a doctor?
            </h2>
            <p>
              Booking an appointment is simple! Just visit our website, browse
              through the list of available doctors, select a suitable time
              slot, and confirm your booking.
            </p>
          </div>
          <div className="question-container">
            <h2 className="font-bold text-lg pb-2">
              Is the Virtual Vaidhya chatbot available 24/7?
            </h2>
            <p>
              Yes, our Virtual Vaidhya chatbot is available round the clock to
              assist you with your health queries and provide instant guidance.
            </p>
          </div>
          <div className="question-container">
            <h2 className="font-bold text-lg pb-2">
              How accurate is the blood report AI scanner and analyzer?
            </h2>
            <p>
              Our blood report AI scanner and analyzer utilize state-of-the-art
              technology to provide accurate analysis of your blood test
              results, ensuring reliable insights into your health status.
            </p>
          </div>{" "}
          <div className="question-container">
            <h2 className="font-bold text-lg pb-2">
              What types of blood tests can be analyzed using your AI scanner?
            </h2>
            <p>
              Our AI scanner can analyze a wide range of blood tests, including
              but not limited to complete blood count (CBC), lipid profile,
              liver function tests, kidney function tests, and more.
            </p>
            6
          </div>{" "}
          <div className="question-container">
            <h2 className="font-bold text-lg pb-2">
              Can I book an appointment with the doctor offline?
            </h2>
            <p>
              Our website offers online doctor booking, Virtual Vaidhya chatbot
              consultations, and blood report AI analysis.
            </p>
          </div>{" "}
          <div className="question-container">
            <h2 className="font-bold text-lg pb-2">
              Is my personal health information secure on your website?
            </h2>
            <p>
              Yes, we take the security and privacy of your personal health
              information very seriously. Our website employs advanced
              encryption protocols and follows strict privacy practices to
              safeguard your data.
            </p>
          </div>{" "}
          <div className="question-container">
            <h2 className="font-bold text-lg pb-2">
              Will I be able to cancel an appointment after booking?
            </h2>
            <p>
              There is no current option of cancelling booked appointments but
              you can contact doctor for the purpose.
            </p>
          </div>
          <div className="question-container">
            <h2 className="font-bold text-lg pb-2">
              Do I have to pay before using Virtual Vaidyha?
            </h2>
            <p>
              No, Our virtual vaidhya is completely free to use. Register to
              UPCHAAR and start using.
            </p>
            <a href="/register" className="text-blue-600 hover:text-green-600">
              Click here to register now
            </a>
          </div>
        </div>
        <Contact />
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export default Questions;
