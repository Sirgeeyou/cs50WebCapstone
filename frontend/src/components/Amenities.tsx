import React from "react";
import { AmenitiesProp } from "./useHotelData";

export const Amenities: React.FC<AmenitiesProp> = ({ amenities }) => {
  console.log("amenities: ", amenities);

  return (
    <div className="container">
      {amenities.map((amenity, index) => (
        <div
          key={index}
          className="collapse collapse-arrow border border-base-300 bg-base-200 mt-3"
        >
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            {amenity.title}
          </div>
          <div className="collapse-content">
            <ul>
              {amenity.contents.map((content, contentIndex) => (
                <li key={contentIndex}>
                  <div
                    tabIndex={0}
                    className="collapse collapse-arrow border border-base-300 bg-base-200"
                  >
                    <div className="collapse-title text-xl font-medium">
                      {content.header.text}
                    </div>
                    <div className="collapse-content">
                      <p>{content.items.map((item, itemIndex) => item.text)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
