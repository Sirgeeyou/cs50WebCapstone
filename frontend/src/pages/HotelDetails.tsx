import { useParams } from "react-router-dom";
import Images from "../components/Images";
import React from "react";
import useHotelData from "../components/useHotelData";
import { HotelHeader } from "../components/HotelHeader";

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

  return (
    <div>
      <div>
        <HotelHeader tagLine={tagLine} />
      </div>
      <div>
        <Images images={images} />
      </div>
    </div>
  );
};
