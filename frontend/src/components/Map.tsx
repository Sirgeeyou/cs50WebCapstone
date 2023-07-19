import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import React from "react";

interface MapProps {
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export const Map: React.FC<MapProps> = ({ coordinates }) => {
  const { latitude, longitude } = coordinates;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBEJYkRMsRDhb051BymjP2UW4-8OdO-8Cc",
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <GoogleMap
        zoom={13}
        center={{ lat: latitude, lng: longitude }}
        mapContainerClassName={
          " justify-center items-center w-120 h-96 bg-gray-200 rounded-lg shadow-md"
        }
      >
        <MarkerF position={{ lat: latitude, lng: longitude }} />
      </GoogleMap>
    </div>
  );
};
