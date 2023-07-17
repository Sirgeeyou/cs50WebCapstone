import { useParams } from "react-router-dom";
import Images from "../components/Images";
import React from "react";
import useHotelImages from "../components/useHotelImages";
import { HotelHeader } from "../components/HotelHeader";

export const HotelDetails: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();

  const { data: images, isLoading, error } = useHotelImages(hotelId);

  return (
    <div>
      <div>
        <Images images={images} />
      </div>
      <div>
        <HotelHeader />
      </div>
    </div>
  );
};
