import React from "react";
import { IoSearch } from "react-icons/io5";

const FindDoctor = () => {
  return (
    <div className="bg-blue-50 h-[40vh] md:h-[50vh] flex items-center justify-center">
    
      <div className="text-center w-[700px]  p-4 md:p-8">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-semibold text-blue-500">
          Find a good doctor
        </h1>
        <p className="text-gray-600 text-sm md:text-base mt-3">
          Our find a doctor tool assists you in choosing from our diverse pool
          of health specialists. Discover better health & wellness by using our
          doctor ratings & reviews to make your choice.
        </p>

        {/* Search Box */}
        <div className="p-2 md:p-3 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 mt-2 md:mt-8 shadow-md rounded-lg">
          <div className="bg-white  rounded-lg p-2">
            <div className="flex w-full items-center space-x-3 text-gray-700">
              <input
                type="text"
                className="flex-grow  border-none outline-none placeholder-gray-400 text-gray-700"
                placeholder="Search by name, specialty, location, etc..."
              />{" "}
              <div className="w-8 h-8 bg-blue-500 hover:bg-blue-600 hover:cursor-pointer rounded text-white flex items-center justify-center">
                <IoSearch size={25} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindDoctor;
