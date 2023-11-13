import React from "react";

interface AdultsFormProps {
  numAdults: number;
  onAdultsChange: (numAdults: number) => void;
}

export const AdultsForm: React.FC<AdultsFormProps> = ({
  numAdults,
  onAdultsChange,
}) => {
  const handleIncrement = () => {
    // Make sure the new value is not greater than 5
    const updatedNum = Math.min(numAdults + 1, 5);
    onAdultsChange(updatedNum); // Call the callback function to update the parent component
  };

  const handleDecrement = () => {
    // Make sure the new value is not less than 1
    const updatedNum = Math.max(numAdults - 1, 1);
    onAdultsChange(updatedNum); // Call the callback function to update the parent component
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleDecrement}
        disabled={numAdults === 1}
        className="px-4 py-2 bg-indigo-500 text-white rounded-l-lg"
      >
        -
      </button>
      <span className="px-4 py-2 bg-gray-200">{numAdults}</span>
      <button
        onClick={handleIncrement}
        disabled={numAdults === 5}
        className="px-4 py-2 bg-indigo-500 text-white rounded-r-lg"
      >
        +
      </button>
    </div>
  );
};

export default AdultsForm;
