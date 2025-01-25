import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", online: 8, offline: 4 },
  { day: "Tue", online: 10, offline: 5 },
  { day: "Wed", online: 12, offline: 6 },
  { day: "Thu", online: 17, offline: 8 },
  { day: "Fri", online: 14, offline: 7 },
  { day: "Sat", online: 8, offline: 4 },
  { day: "Sun", online: 6, offline: 3 },
];

const WorkingHoursChart = () => {
  return (
    <div className="p-4 bg-white w-3/6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Working Hours</h3>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="online"
            stroke="#4F46E5"
            name="Online"
          />
          <Line
            type="monotone"
            dataKey="offline"
            stroke="#F97316"
            name="Offline"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkingHoursChart;
