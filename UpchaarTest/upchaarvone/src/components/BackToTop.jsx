import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const BackToTop = () => {
  const [backToTop, setBackToTop] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    });
  });

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      {backToTop && (
        <button
          style={{
            position: "fixed",
            bottom: "40px",
            right: "30px",
            height: "60px", // Adjust the button size
            width: "60px", // Adjust the button size
            borderRadius: "50%", // Ensures the button is round
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#12131a", // Slate-700 background color
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional, for shadow effect
          }}
          onClick={scrollUp}
        >
          <motion.p
            className="text-white" // Ensures the emoji is visible
            animate={{ scale: 1.2 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              fontSize: "30px", // Adjust emoji size to fit the button
            }}
          >
            💉
          </motion.p>
        </button>
      )}
    </div>
  );
};

export default BackToTop;
