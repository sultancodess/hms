import React from "react";
import { Link } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdBedroomParent } from "react-icons/md";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { PiNotePencilBold } from "react-icons/pi";
import { FaLaptop } from "react-icons/fa";
import { GiPill } from "react-icons/gi";
const HealthcareActions = () => {
  const actions = [
    {
      icon: <FaRegCalendarAlt />,
      label: "Book Appointment",
      url: "/book-appointment",
      bgColor: "bg-blue-200",
      iconColor: "text-blue-500",
      borderColor: "border-blue-500",
    },
    {
      icon: <FaMagnifyingGlass />,
      label: "Find Doctor",
      url: "/all-doctors",
      bgColor: "bg-green-100",
      iconColor: "text-green-500",
      borderColor: "border-green-500",
    },
    {
      icon: <MdBedroomParent />,
      label: "Check Bed Avialability",
      url: "/check-bed-availability",
      bgColor: "bg-purple-200",
      iconColor: "text-purple-500",
      borderColor: "border-purple-500",
    },
    {
      icon: <PiNotePencilBold />,
      label: "Book Health Check-Up",
      url: "/book-health-checkup",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      borderColor: "border-green-600",
    },
    {
      icon: <FaLaptop />,
      label: "Consult Online",
      url: "/consult-online",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-500",
      borderColor: "border-yellow-500",
    },
    {
      icon: <GiPill />,
      label: "Buy Medicine",
      url: "/buy-medicine",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-500",
      borderColor: "border-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 lg:grid-cols-6 p-4 md:p-6 bg-[#dcecf8] shadow-md rounded-lg">
      {actions.map((action, index) => (
        <Link
          to={action.url}
          key={index}
          className={` ${action.iconColor}  flex flex-col items-center  justify-center w-full  px-2 h-24 sm:h-28 md:h-32 bg-white shadow-md rounded-lg text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg border-l-4 ${action.borderColor}`}
        >
          <div className="text-2xl sm:text-4xl mb-2">{action.icon}</div>
          <div className="text-xs md:text-sm font-medium text-gray-700">
            {action.label}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HealthcareActions;
