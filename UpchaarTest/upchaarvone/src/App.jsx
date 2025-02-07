import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import Register from "./pages/Register";
import UserDetails from "./pages/UserDetails";
import Features from "./pages/Features";
import FindDoctor from "./pages/FindDoctor";
import Appointment from "./pages/Appointment";
import Questions from "./pages/Questions.jsx";

import { ToastContainer } from "react-toastify";
import PaymentSuccess from "./components/PaymentSuccess.jsx";
import ChatBot from "./pages/ChatBot.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Preloader from "./components/Preloader.jsx";
import About from "./components/About.jsx";
import AboutUs from "./pages/AboutUs.jsx";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000); // Simulate loading delay
  }, []);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <Router>
          <ScrollToTop />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/userdetails" element={<UserDetails />} />
            <Route path="/features" element={<Features />} />
            <Route path="/finddoctor" element={<FindDoctor />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/faq" element={<Questions />} />
            <Route path="/virtualvaidhya" element={<ChatBot />} />
            <Route path="/aboutus" element={<AboutUs />} />

            {/* <Route path="/applydoctor" element={<ApplyDoctor />} /> */}
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
          <ToastContainer position="top-center" />
        </Router>
      )}
    </>
  );
};

export default App;
