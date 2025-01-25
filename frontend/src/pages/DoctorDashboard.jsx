import React, { useState, useEffect } from "react";
import BedChecking from "../components/BedCheking/BedChecking";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoBedSharp } from "react-icons/io5";
import DoctorAppointment from "../components/DoctorDashboardLinks/DoctorAppointment";
import { FaUser } from "react-icons/fa6";
import DoctorOverview from "../components/DoctorDashboardLinks/DocOverview";
import axios from "axios";

const DoctorDashboard = () => {
  const savedActiveSection = localStorage.getItem("activeSection");
  const [activeSection, setActiveSection] = useState(
    savedActiveSection || "dashboard"
  );
const [doctor, setDoctor] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const id = localStorage.getItem("userId");

useEffect(() => {
  if (!id) {
    setError("No ID found in localStorage.");
    setLoading(false);
    return;
  }

  const fetchDoctor = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-staff/${id}`
      );
      setDoctor(response.data.data);
    } catch (err) {
      setError("Failed to fetch doctor data.");
    } finally {
      setLoading(false);
    }
  };

  fetchDoctor();
}, [id]);
  const renderContent = () => {
    switch (activeSection) {
      case "doctorOverview":
        return <DoctorOverview doctor={ doctor} />;

      case "check-bed-availability":
        return <BedChecking />;
      case "appointments":
        return <DoctorAppointment />;
      default:
        return <DoctorOverview />;
    }
  };
  useEffect(() => {
    localStorage.setItem("activeSection", activeSection);
  }, [activeSection]);

  return (
    <div className="flex w-full h-[85vh] fixed bg-gray-100">
      {/* Collapsible Sidebar */}
      <aside className="w-64 bg-white p-4 shadow-md transition-all duration-300">
        <div className="text-blue-500 font-semibold text-2xl text-center mb-6">
          Doctor Dashboard
        </div>
        <nav>
          <ul className="space-y-4">
            {[
              {
                label: "Overview",
                icon: <TbLayoutDashboardFilled />,
                key: "doctorOverview",
              },

              {
                label: "Check Beds Availability",
                icon: <IoBedSharp />,
                key: "check-bed-availability",
              },
              {
                label: "Appointments",
                icon: <FaUser />,
                key: "appointments",
              },
            ].map(({ label, icon, key }) => (
              <li
                key={key}
                onClick={() => setActiveSection(key)}
                className={`flex items-center gap-2 text-gray-700 bg-blue-50 hover:bg-blue-100 hover:text-blue-600 p-2 rounded cursor-pointer ${
                  activeSection === key ? "bg-blue-500 text-white" : ""
                }`}
              >
                {icon && <span>{icon}</span>}
                {label}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1  overflow-y-auto bg-gray-50 shadow-inner">
        <div className="transition-opacity duration-300 ease-in-out">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
