import { useParams } from "react-router-dom";
import Images from "../components/Images";
import { useFetchData } from "../components/useFetchData";
import React from "react";
import useHotelImages from "../components/useHotelImages";

export const HotelDetails: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();

  const { data: images, isLoading, error } = useHotelImages(hotelId);

  const data = useFetchData(hotelId);
  console.log("HotelDetails:", data);

  return (
    <div>
      <Images images={images} />
    </div>
  );
};
