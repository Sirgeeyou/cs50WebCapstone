import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SearchBar } from "./SearchBar";
import { format, addDays } from "date-fns";
import AdultsForm from "./Adults";

interface UserInputProps {
  onFormSubmit: (checkInDate: Date | null, checkOutDate: Date | null) => void;
  onGaiaIdChange: (gaiaId: string) => void;
  onAdultsChange: (num: number) => void;
}

const UserInput: React.FC<UserInputProps> = ({
  onFormSubmit,
  onGaiaIdChange,
}) => {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [numAdults, setNumAdults] = useState(1);

  const handleCheckInDateChange = (date: Date | null) => {
    setCheckInDate(date);
    console.log("SETCHEKCINDATE: ", date);
  };

  const handleCheckOutDateChange = (date: Date | null) => {
    setCheckOutDate(date);
    console.log("SETCHECKOUTDATE: ", date);
  };

  const handleAdultsChange = (num: number) => {
    setNumAdults(num);
    console.log("Number of Adults: ", num);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Adjust the dates to be local to your timezone
    const adjustedCheckInDate = checkInDate ? addDays(checkInDate, 1) : null;
    const adjustedCheckOutDate = checkOutDate ? addDays(checkOutDate, 1) : null;

    // Format the adjusted dates as "yyyy-MM-dd" for API request
    const formattedCheckInDate = adjustedCheckInDate
      ? format(adjustedCheckInDate, "yyyy-MM-dd")
      : null;
    const formattedCheckOutDate = adjustedCheckOutDate
      ? format(adjustedCheckOutDate, "yyyy-MM-dd")
      : null;

    console.log("Check-in Date:", formattedCheckInDate);
    console.log("Check-out Date:", formattedCheckOutDate);

    onFormSubmit(adjustedCheckInDate, adjustedCheckOutDate);
  };

  const handleGaiaIdChange = (id: string) => {
    // define this function
    onGaiaIdChange(id); // call the prop function with the id argument
    console.log("SETGAIAID: ", id); // optional logging
  };

  return (
    <div className="max-w-xs mx-auto">
      <SearchBar onGaiaIdChange={handleGaiaIdChange} />
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Select Number of Adults</h1>
        <AdultsForm numAdults={numAdults} onAdultsChange={handleAdultsChange} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
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
              minDate={new Date()}
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
              minDate={checkInDate}
              dateFormat="yyyy-MM-dd"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
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
