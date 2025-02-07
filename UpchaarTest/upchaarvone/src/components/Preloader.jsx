import React, { useState, useEffect } from "react";
import { getImageUrl } from "../utils.js";

const quotes = [
  "Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship. — Buddha",
  "The first wealth is health. — Ralph Waldo Emerson",
  "A healthy outside starts from the inside. — Robert Urich",
  "हर मनुष्य अपनी सेहत ख़ुद ही लिखता है. – गौतम बुद्ध",
  "Your body hears everything your mind says. Stay positive!",
  "मैंने ख़ुश रहना इसलिए चुना है क्योंकि ये मेरे स्वास्थ्य के लिए काफ़ी फ़ायदेमंद है. – वॉल्टेयर",
  "There is no health without mental health; mental health is too important to be left to the professionals alone, and mental health is everyone's business– Vikram Patel",
  "To keep the body in good health is a duty... otherwise we shall not be able to keep our mind strong and clear. — Buddha",
  "अपने शरीर का ख्याल रखें। यह आपके रहने के लिए एकमात्र जगह है। - जिम रोहन.",
  "If you know the art of deep breathing, you have the strength, wisdom and courage of ten tigers.",
];

const Preloader = () => {
  const [currentQuote, setCurrentQuote] = useState("");

  useEffect(() => {
    setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    const interval = setInterval(() => {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-gray-200 to-black text-white z-50">
      {/* Brain Spinner */}
      <div className="relative mb-14 w-max h-28 animate-pulse">
        <img
          className="w-[200px] "
          src={getImageUrl("Home/Homelogo.png")}
        ></img>
        {/* <div className="absolute w-full h-full rounded-full border-4 border-t-teal-400 border-green-300"></div>
        <div className="absolute w-24 h-24 rounded-full border-4 border-t-green-300 border-orange-600 animate-spin delay-150"></div>
        <div className="absolute w-20 h-20 rounded-full border-4 border-t-green-200 border-gray-600 animate-spin delay-300"></div>
        <div className="absolute w-16 h-16 rounded-full border-4 border-t-orange-300 border-orange-600 animate-spin delay-450"></div> */}
      </div>

      {/* Quote Section */}
      <div className="mt-8 px-4 text-center max-w-lg">
        <p className="text-2xl italic font-bold text-orange-500">
          {currentQuote}
        </p>
      </div>
    </div>
  );
};

export default Preloader;
