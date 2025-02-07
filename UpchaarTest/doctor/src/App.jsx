import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import axios from "axios";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Update from "./components/Update";

const App = () => {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/doctor/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/updateProfile" element={<Update />} />
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
