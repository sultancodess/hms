import React, { useState } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState([]);

  const today = new Date();

  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleDateClick = (date) => {
    const isSelected = selectedDates.some(
      (d) => d.toDateString() === date.toDateString()
    );
    if (isSelected) {
      setSelectedDates(
        selectedDates.filter((d) => d.toDateString() !== date.toDateString())
      );
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const renderDays = () => {
    const firstDayIndex = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    const days = getDaysInMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    const leadingEmptyDays = (firstDayIndex + 6) % 7;

    return (
      <>
        {[...Array(leadingEmptyDays)].map((_, index) => (
          <div key={index} className="w-10 h-10"></div>
        ))}
        {days.map((day) => {
          const isToday = day.toDateString() === today.toDateString();
          const isSelected = selectedDates.some(
            (d) => d.toDateString() === day.toDateString()
          );

          return (
            <button
              key={day}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium ${
                isSelected
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg"
                  : isToday
                  ? "border-2 border-blue-500 text-black shadow-md"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleDateClick(day)}
            >
              {day.getDate()}
            </button>
          );
        })}
      </>
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-80 h-96">
      <div className="flex justify-between items-center border-b-2 border-gray-200 pb-3 mb-6">
        <button
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600"
          onClick={handlePrevMonth}
        >
          <IoMdArrowDropleft size={20} />
        </button>
        <span className="font-semibold text-lg text-gray-800">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </span>
        <button
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600"
          onClick={handleNextMonth}
        >
          <IoMdArrowDropright size={20} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xsm text-gray-600">
        {daysOfWeek.map((day) => (
          <div key={day} className="font-semibold bg-gray-100 rounded text-gray-400">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
      {/* <button className="mt-6 px-4 flex-end text-sm bg-gradient-to-r bg-blue-500  text-white py-2 rounded shadow-lg ">
        Done
      </button> */}
    </div>
  );
};

export default Calendar;
