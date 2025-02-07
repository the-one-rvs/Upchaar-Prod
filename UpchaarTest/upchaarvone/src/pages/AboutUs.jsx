import React from "react";
import Navbar from "../components/Navbar";
import NavbarF from "../components/NavbarF";
import NavbarLogin from "../components/Register/NavbarRegister";
import Footer from "../components/Footer";
import { getImageUrl } from "../utils";

const AboutUs = () => {
  return (
    <>
      <NavbarLogin />
      <div className=" text-black min-h-screen">
        {/* Hero Section */}
        <section className="text-center py-14">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-400">
            About Us
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Discover who we are and what drives us to create impactful
            solutions.
          </p>
        </section>

        {/* Vision Section */}
        <section className="max-w-7xl mx-auto px-6 py-8">
          <h2 className="text-3xl font-bold text-orange-400">Our Vision</h2>
          <p className=" text-lg leading-relaxed">
            At UPCHAAR, our vision is to empower individuals with advanced
            medical solutions powered by technology. We aim to bridge the gap
            between healthcare and technology, making health services
            accessible, reliable, and efficient for everyone. Our journey is
            fueled by the belief that every individual deserves quality
            healthcare regardless of their location or circumstances. We
            envision a future where technology serves as a tool to eliminate
            barriers, enabling faster diagnoses, seamless communication with
            healthcare providers, and a more personalized approach to medical
            care. By harnessing cutting-edge innovations, we aspire to create a
            platform that not only addresses current healthcare challenges but
            also anticipates the needs of tomorrow. Together, we can pave the
            way for a healthier and more connected world."
          </p>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-14">
          <h2 className="text-3xl font-bold text-orange-400 text-center">
            Meet the Developers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {/* Developer 1 */}
            <div className="p-4 rounded-lg shadow-lg bg-gray-800 text-white flex flex-col items-center">
              <div className="w-24 h-24 mb-4 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={getImageUrl("images/dev1.jpg")}
                  alt="Vaibhav Sarswat"
                />
              </div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-orange-400">
                  Vaibhav Sarswat
                </h3>
                <a
                  href="https://www.linkedin.com/in/the-one-rvs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400"
                >
                  <img
                    className="w-6"
                    src="https://img.icons8.com/color/96/linkedin.png"
                  />
                </a>
              </div>
            </div>

            {/* Developer 2 */}
            <div className="p-4 rounded-lg shadow-lg bg-gray-800 text-white flex flex-col items-center">
              <div className="w-24 h-24 mb-4 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={getImageUrl("images/dev2.png")}
                  alt="Utkarsh Gual"
                />
              </div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-orange-400">
                  Utkarsh Gual
                </h3>
                <a
                  href="https://www.linkedin.com/in/utkarsh-gual"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400"
                >
                  <img
                    className="w-6"
                    src="https://img.icons8.com/color/96/linkedin.png"
                  />
                </a>
              </div>
            </div>

            {/* Developer 3 */}
            <div className="p-4 rounded-lg shadow-lg bg-gray-800 text-white flex flex-col items-center">
              <div className="w-24 h-24 mb-4 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={getImageUrl("images/dev3.jpg")}
                  alt="Yashvardhan Singh"
                />
              </div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-orange-400">
                  Yashvardhan Singh
                </h3>
                <a
                  href="https://www.linkedin.com/in/vardhan-ysh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400"
                >
                  <img
                    className="w-6"
                    src="https://img.icons8.com/color/96/linkedin.png"
                  />
                </a>
              </div>
            </div>

            {/* Developer 4 */}
            <div className="p-4 rounded-lg shadow-lg bg-gray-800 text-white flex flex-col items-center">
              <div className="w-24 h-24 mb-4 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={getImageUrl("images/dev4.jpg")}
                  alt="Shikhar Varshney"
                />
              </div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-orange-400">
                  Shikhar Varshney
                </h3>

                <a
                  href="https://www.linkedin.com/in/shikhar-varshney-59897a270/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400"
                >
                  {" "}
                  <img
                    className="w-6"
                    src="https://img.icons8.com/color/96/linkedin.png"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Section */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-orange-400 text-center">
            Join Us on Our Journey
          </h2>
          <p className="mt-4 text-lg text-center">
            Together, we can create a healthier, more connected future.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
