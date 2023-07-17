import React from "react";

interface HotelHeaderProps {
  tagLine: string;
}

export const HotelHeader: React.FC<HotelHeaderProps> = ({ tagLine }) => {
  return (
    <div className="container mx-auto pt-8">
      <div className="flex justify-center items-center">
        <div className="flex flex-wrap justify-center">
          <p className="text-2xl font-bold">{tagLine}</p>
        </div>
      </div>
    </div>
  );
};
