import React from 'react'

const Hero = () => {
  return (
    <div className="h-fit md:h-[60vh] flex mb-10  rounded-lg flex-col-reverse  md:flex-row gap-8 p-2 md:px-6 md:py-8 bg-[#dcecf8]">
      {/* Left Section - Text and Button */}
      <div className="w-full lg:w-3/6 flex flex-col items-center  lg:items-start justify-center mb-4">
        <h1 className="text-3xl lg:text-5xl font-semibold text-blue-600 text-center lg:text-left transition-all duration-500 ease-in-out transform hover:scale-105">
          Welcome to MEDICARE <br />
          <span className="text-2xl text-gray-700">
            Your Health, Our Priority.
          </span>
        </h1>
        <p className="mt-4 text-sm md:text-lg text-zinc-500 text-center lg:text-left transition-all duration-500 ease-in-out opacity-90 hover:opacity-100">
          Providing compassionate care, advanced medical treatments, and a
          patient-centered approach to ensure your well-being. Book your
          appointments seamlessly with us today.
        </p>
        <div className="bg-blue-600 rounded mt-8 text-xl lg:text-2xl text-white px-6 py-3 w-fit cursor-pointer transform transition-all duration-300 hover:bg-blue-700 hover:scale-105">
          Book Appointment
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="w-full lg:w-3/6 h-fit lg:h-[100%] flex items-center justify-center">
        <img
          src="./hero.png"
          alt="hero-img"
          className=" w-12/12 md:w-9/12 rounded-xl   object-contain"
        />
      </div>
    </div>
  );
}

export default Hero