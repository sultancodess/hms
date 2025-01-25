import React from 'react';
import { FaCalendarAlt, FaHeartbeat, FaUserMd } from 'react-icons/fa';

const Services = () => {
  return (
    <section className="bg-[#f8fcff] py-12">
      <div className="container mx-auto text-center">
        {/* Section Title */}
        <h3 className="text-xl font-medium text-gray-600">Our Services</h3>
        <h2 className="text-3xl font-semibold text-gray-800 mt-2">
          4 Step Easy We Care Your Health
        </h2>

        {/* Services Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-10">
          {/* Step 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FaCalendarAlt className="text-blue-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Date</h3>
            <p className="mt-2 text-gray-500">Choose what date to check.</p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FaHeartbeat className="text-red-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Poly</h3>
            <p className="mt-2 text-gray-500">Choose what poly to check.</p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <FaUserMd className="text-green-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Doctor</h3>
            <p className="mt-2 text-gray-500">And choose doctor to check.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
