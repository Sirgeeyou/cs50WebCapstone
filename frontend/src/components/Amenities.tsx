import React from "react";
import { AmenitiesProp } from "./useHotelData";

export const Amenities: React.FC<AmenitiesProp> = ({ amenities }) => {
  console.log("amenities: ", amenities);

  return (
    <div>
      {amenities.map((amenity, index) => (
        <div
          key={index}
          tabIndex={0}
          className="collapse collapse-arrow border border-base-300 bg-base-200"
        >
          <div className="collapse-title text-xl font-medium">
            {amenity.title}
          </div>
          <div className="collapse-content">
            <ul>
              {amenity.contents.map((content, contentIndex) => (
                <li key={contentIndex}>{content.header.text}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
