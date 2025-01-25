import React from "react";

import { MdOutlinePendingActions } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { FaUser } from "react-icons/fa6";
import { AiFillSchedule } from "react-icons/ai";


const TopAdminDash = ({ data }) => {
  
  const analyticsCards = [
    {
      title: "Total Patients",
      value: "445",
      description: "Number of register patients",
      icon: <FaUser/>,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500",

      borderColor: "border-blue-500",
    },
    {
      title: "Total Doctors",
      value: "20",
      description: "Number of active Doctors",
      icon: <HiUsers/>, // Replace with your preferred icon or SVG
      bgColor: "bg-purple-100",
      iconColor: "text-purple-500",

      borderColor: "border-purple-500",
    },

    {
      title: "Pending Appointments",
      value: "154",
      description: "Pending appointments",
      icon: <MdOutlinePendingActions/>, // Replace with your preferred icon or SVG
      bgColor: "bg-orange-100",
      iconColor: "text-orange-500",

      borderColor: "border-orange-500",
    },
    {
      title: "Schedule Appointments",
      value: "29",
      description: " Total schedule appointment ",
      icon: <AiFillSchedule/>, // Replace with your preferred icon or SVG

      bgColor: "bg-green-100",
      iconColor: "text-green-500",

      borderColor: "border-green-500",
    },
  ];

  // Function to format the current date and time
  const formatDate = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = (hours % 12 || 12).toString(); // Convert 24-hour time to 12-hour time

    return `${month}/${day}/${year} - ${formattedHours}:${minutes} ${ampm}`;
  };

  const currentDate = formatDate(new Date()); // Get the current date and time

  return (
    <div className="p-3 w-3/6 bg-white rounded-lg shadow-md">
      {/* Header */}
    

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 w-full gap-3">
        {analyticsCards.map((card, index) => (
          <div
            key={index}
            className={`p-2 ${card.bgColor} border-l-4 ${card.borderColor}  rounded-lg shadow-sm`}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-700">
                {card.title}
              </h3>
              <span className={`text-2xl ${card.iconColor}`}>{card.icon}</span>
            </div>
            <div className="mt-2">
              <p className="text-3xl font-bold">{card.value}</p>
              <p className="text-xs mt-1 md:text-md text-gray-500">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopAdminDash;
