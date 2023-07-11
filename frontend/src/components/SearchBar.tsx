import { useState, useEffect } from "react";
import axios from "axios";

export const SearchBar = () => {
  const [country, setCountry] = useState("");

  const handleInputChange = (event: any) => {
    console.log(event.target.value);
    setCountry(event.target.value);
  };

  return (
    <div>
      <input
        onChange={handleInputChange}
        value={country}
        type="text"
        placeholder="Search for a country"
        className="input w-full max-w-xs text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
      />
    </div>
  );
};
