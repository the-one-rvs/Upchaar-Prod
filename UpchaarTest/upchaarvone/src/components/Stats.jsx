import React from "react";
import {
  FaUserMd,
  FaUserFriends,
  FaChartLine,
  FaHospital,
} from "react-icons/fa";

const Stats = () => {
  return (
    <div className="flex flex-col items-center justify-center pb-14">
      <div className="pl-8 text-center">
        <div className="text-5xl font-bold text-orange-500 max-md:text-4xl">
          <span className="border-b-2 border-blue-500 font-bold ">
            Statistics
          </span>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-12 space-y-8 md:space-y-0 md:space-x-8">
        {/* First Card */}
        <div className="bg-gray-100 shadow-md rounded-lg p-6 max-w-sm w-full md:w-auto">
          <div className="flex items-center justify-center mb-4">
            <FaUserMd className="text-4xl text-violet-500 mr-2" />
            <h2 className="text-2xl font-bold text-violet-500 text-center">
              Doctor's Onboard
            </h2>
          </div>
          <p className="text-2xl font-bold text-gray-700 text-center">10+</p>
        </div>
        {/* Second Card */}
        <div className="bg-gray-100 shadow-md rounded-lg p-6 max-w-sm w-full md:w-auto">
          <div className="flex items-center justify-center mb-4">
            <FaUserFriends className="text-4xl text-violet-500 mr-2" />
            <h2 className="text-2xl font-bold text-violet-500 text-center">
              Active Users
            </h2>
          </div>
          <p className="text-2xl font-bold text-gray-700 text-center">100+</p>
        </div>
        {/* Third Card */}
        <div className="bg-gray-100 shadow-md rounded-lg p-6 max-w-sm w-full md:w-auto">
          <div className="flex items-center justify-center mb-4">
            <FaChartLine className="text-4xl text-violet-500 mr-2" />
            <h2 className="text-2xl font-bold text-violet-500 text-center">
              Scans Analysed
            </h2>
          </div>
          <p className="text-2xl font-bold text-gray-700 text-center">80+</p>
        </div>

        {/* <div className="bg-gray-100 shadow-md rounded-lg p-6 max-w-sm w-full md:w-auto">
          <div className="flex items-center justify-center mb-4">
            <FaHospital className="text-4xl text-violet-500 mr-2" />
            <h2 className="text-2xl font-bold text-violet-500 text-center">
              Departments
            </h2>
          </div>
          <p className="text-2xl font-bold text-gray-700 text-center">10</p>
        </div> */}
      </div>
    </div>
  );
};

export default Stats;
