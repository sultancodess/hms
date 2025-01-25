import React from "react";
import { MdMeetingRoom, MdBedroomChild, MdBed } from "react-icons/md";
import { IoIosBed } from "react-icons/io";

const AutomationAnalytics = ({ data }) => {
    const totalRooms = data.length; 
    const totalBeds = data.reduce((acc, room) => acc + room.beds.length, 0);
    const totalOccupiedBeds = data.reduce((acc, room) => {
      // Count only the beds where 'isOccupied' is true
      const occupiedBeds = room.beds.filter((bed) => bed.isOccupied).length;
      return acc + occupiedBeds;
    }, 0);
    const totalAvailableBeds = totalBeds - totalOccupiedBeds;
  const analyticsCards = [
    {
      title: "Total Rooms",
      value: totalRooms, // Number of rooms
      description: "Rooms available in the system",
      icon: <MdMeetingRoom />, // Replace with your preferred icon or SVG
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500",

      borderColor: "border-blue-500",
    },
    {
      title: "Total Beds",
      value: totalBeds, // Number of
      description: "Total Beds available in the system",
      icon: <MdBed />, // Replace with your preferred icon or SVG
      bgColor: "bg-purple-100",
      iconColor: "text-purple-500",

      borderColor: "border-purple-500",
    },

    {
      title: "Occupied Beds",
      value: totalOccupiedBeds,
      description: "Total Occupied Beds available in the system",
      icon: <MdBedroomChild />, // Replace with your preferred icon or SVG
      bgColor: "bg-orange-100",
      iconColor: "text-orange-500",

      borderColor: "border-orange-500",
    },
    {
      title: "Available Beds",
      value: totalAvailableBeds,
      description: " Beds available in the system",
      icon: <IoIosBed />, // Replace with your preferred icon or SVG

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
    <div className="p-3 md:p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg md:text-3xl font-semibold text-blue-500">
          Rooms Automation Analytics
        </h2>
        <div className="flex text-xs md:text-base items-center space-x-2 bg-white p-2 rounded-md shadow">
          <span className="text-gray-600">{currentDate}</span>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2  lg:grid-cols-4 gap-4">
        {analyticsCards.map((card, index) => (
          <div
            key={index}
            className={`p-4 ${card.bgColor} border-l-4 ${card.borderColor} rounded-lg shadow-sm`}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-700">
                {card.title}
              </h3>
              <span className={`text-2xl ${card.iconColor}`}>{card.icon}</span>
            </div>
            <div className="mt-2">
              <p className="text-3xl font-bold">{card.value}</p>
              <p className="text-xs mt-1 md:text-md text-gray-500">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutomationAnalytics;
