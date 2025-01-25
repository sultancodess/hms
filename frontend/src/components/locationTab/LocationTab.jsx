import React, { useState } from "react";
import {
  FaUserMd,
  FaHospital,
  FaGraduationCap,
  FaIdBadge,
  FaLanguage,
  FaRegClock,
} from "react-icons/fa";

const HospitalInfo = ({data}) => {
  const [activeTab, setActiveTab] = useState("info");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="mt-5 p-2 md:p-5 border border-gray-300 rounded-lg shadow-lg">
      <div className="flex border-b-2 border-blue-500 mb-5">
        <button
          onClick={() => handleTabClick("info")}
          className={`flex-1 py-2 text-center font-medium rounded-t-lg ${
            activeTab === "info"
              ? "bg-blue-500 text-white"
              : "bg-transparent text-black hover:bg-orange-100"
          }`}
        >
          Info
        </button>
        <button
          onClick={() => handleTabClick("location")}
          className={`flex-1 py-2 text-center font-medium rounded-t-lg ${
            activeTab === "location"
              ? "bg-blue-500 text-white"
              : "bg-transparent text-black hover:bg-orange-100"
          }`}
        >
          Location
        </button>
      </div>

      {/* Content */}
      {activeTab === "info" && (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg p-6 max-w-full mx-auto h-auto md:h-auto overflow-hidden border border-gray-200">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center border-b pb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Doctor's Information
              </h2>
            </div>

            {/* Details */}

            <div className="space-y-4 flex flex-col md:flex-row gap-2 md:gap-4 ">
              <div className="w-full md:w-3/6 bg-gray-200 rounded-lg p-3  md:p-6 flex flex-col gap-3">
                <p className="flex items-center text-sm md:text-lg text-gray-800">
                  <FaUserMd className="mr-2 text-blue-500" />
                  <span className="font-medium">Specialization:</span>{" "}
                  <span className="ml-2 text-gray-600">
                    {data.specialization || "Not specified"}
                  </span>
                </p>

                <p className="flex items-center text-sm md:text-lg text-gray-800">
                  <FaHospital className="mr-2 text-purple-500" />
                  <span className="font-medium">OPD No:</span>{" "}
                  <span className="ml-2 text-gray-600">
                    {data.OpdNo || "Not specified"}
                  </span>
                </p>

                <p className="flex items-center text-sm md:text-lg text-gray-800">
                  <FaGraduationCap className="mr-2 text-green-500" />
                  <span className="font-medium">Qualification:</span>{" "}
                  <span className="ml-2 text-gray-600">
                    {data.qualification || "N/A"}
                  </span>
                </p>

                <p className="flex items-center text-sm md:text-lg text-gray-800">
                  <FaIdBadge className="mr-2 text-red-500" />
                  <span className="font-medium">Registration No:</span>{" "}
                  <span className="ml-2 text-gray-600">
                    {data.registrationNo || "N/A"}
                  </span>
                </p>

                <p className="flex items-center text-sm md:text-lg text-gray-800">
                  <FaLanguage className="mr-2 text-yellow-500" />
                  <span className="font-medium">Languages:</span>{" "}
                  <span className="ml-2 text-gray-600">
                    {data.languages?.join(", ") || "Not specified"}
                  </span>
                </p>
              </div>

              <div className="overflow-x-auto w-full md:w-3/6">
                <span className="text-sm md:text-lg flex gap-2 items-center font-semibold  text-green-500">
                  <FaRegClock /> Availability:
                </span>
                <table className="table-auto w-full border mt-3 border-gray-200 rounded-lg shadow-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                        Day
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                        Time Slots
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Check if availability exists */}
                    {data.availability?.days?.length > 0 &&
                    data.availability?.timeSlots?.length > 0 ? (
                      data.availability.days.map((day, index) => (
                        <tr
                          key={index}
                          className="odd:bg-white even:bg-gray-50"
                        >
                          <td className="px-4 py-2 text-gray-800 border-b">
                            {day}
                          </td>
                          <td className="px-4 py-2 text-sm md:text-lg text-gray-800 border-b">
                            {data.availability.timeSlots[index]
                              ? `${data.availability.timeSlots[index].start} - ${data.availability.timeSlots[index].end}`
                              : "Not specified"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="2"
                          className="px-4 py-2 text-sm md:text-lg text-center text-gray-600 border-b"
                        >
                          Days not specified & Time slots not available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center border-t pt-4">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">
                Contact Doctor
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "location" && (
        <div>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.263716842958!2d77.583283814334!3d12.936486119184443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1563485ab4fb%3A0x114b6f1a06745647!2sApollo%20Speciality%20Hospitals%20Jayanagar!5e0!3m2!1sen!2sin!4v1696606239079!5m2!1sen!2sin"
            className="w-full h-60 md:h-96 rounded-lg border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default HospitalInfo;
