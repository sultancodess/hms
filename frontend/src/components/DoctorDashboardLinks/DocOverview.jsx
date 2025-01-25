import React from "react";
import TopAdminDash from "../AdminDashbordLinks/AdminComponents/TopAdminDash";
import Calendar from "../Calendar/Calendar";
import WorkingHoursChart from "../AdminDashbordLinks/AdminComponents/Chart";

const DoctorOverview = ({ doctor }) => {
  return (
    <div className="w-full h-[85vh] bg-gray-50 p-3">
      <div className="w-full h-full bg-white rounded-xl overflow-y-scroll p-3 ">
        <div className="m-3">
          <h1 className="capitalize text-2xl font-semibold text-gray-600">
            Welcome, Dr. {doctor?.name?.replace(/^Dr\.?\s*/i, "")}!
          </h1>

          <p className="text-xsm text-gray-400">
            Check the latest update on your account.
          </p>
        </div>
        <h1 className="text-xl font-semibold m-3 text-gray-500">Overwiew</h1>
        <div className="w-full h-80vh flex gap-4">
          <div className="w-full h-full flex flex-col gap-2">
            <div className="w-full h-full flex gap-2">
              {" "}
              <TopAdminDash />
              <WorkingHoursChart />
            </div>
            <div className="w-full h-80 rounded shadow-lg p-3">hello</div>
          </div>

          <div className="w-fit  h-full">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorOverview;
