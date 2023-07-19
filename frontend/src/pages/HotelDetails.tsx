import { useParams } from "react-router-dom";
import Images from "../components/Images";
import React from "react";
import useHotelData from "../components/useHotelData";
import { HotelHeader } from "../components/HotelHeader";
import { Map } from "../components/Map";
import { Amenities } from "../components/Amenities";

export const HotelDetails: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();

  const { data, isLoading, error } = useHotelData(hotelId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const images = data?.propertyGallery.images;
  const tagLine = data?.summary.tagline;
  const coordinates = data?.summary.location.coordinates;
  const amenities = data?.summary.amenities.amenities;
  console.log("DATA: ", data);
  console.log("HotelDetails amenities", amenities);

  return (
    <div>
      <div>
        <HotelHeader tagLine={tagLine} />
      </div>
      <div>
        <Images images={images} />
      </div>
      <div>
        <Amenities amenities={amenities} />
      </div>
      {/*<div className=`1"container mx-auto px-24 mt-4">
        <p className="font-mono text-xl mb-4 mt-10">Where you'll be</p>
        <Map coordinates={coordinates} />
      </div>*/}
    </div>
  );
};
