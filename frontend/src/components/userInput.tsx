import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface UserInputProps {
  onFormSubmit: (checkInDate: Date | null, checkOutDate: Date | null) => void;
}

const UserInput: React.FC<UserInputProps> = ({ onFormSubmit }) => {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

  const handleCheckInDateChange = (date: Date | null) => {
    setCheckInDate(date);
  };

  const handleCheckOutDateChange = (date: Date | null) => {
    setCheckOutDate(date);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Check-in Date:", checkInDate?.toISOString().split("T")[0]);
    console.log("Check-out Date:", checkOutDate?.toISOString().split("T")[0]);
    onFormSubmit(checkInDate, checkOutDate);
    console.log(onFormSubmit);
  };

  const presentDay = new Date();

  return (
    <div className="max-w-xs mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="checkInDate"
            className="block font-medium text-A6ADBA"
          >
            Check-in Date
          </label>
          <DatePicker
            id="checkInDate"
            selected={checkInDate}
            onChange={handleCheckInDateChange}
            showTimeSelect={false}
            minDate={presentDay}
            dateFormat="yyyy-MM-dd"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="checkOutDate"
            className="block font-medium text-A6ADBA"
          >
            Check-out Date
          </label>
          <DatePicker
            id="checkOutDate"
            selected={checkOutDate}
            onChange={handleCheckOutDateChange}
            showTimeSelect={false}
            minDate={checkInDate || presentDay}
            dateFormat="yyyy-MM-dd"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserInput;
