import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Image } from "./Images";

interface Summary {
  location: {
    address: {
      adressLine: string;
      city: string;
    };
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  tagline: string;
}

interface HotelData {
  propertyGallery: {
    images: Image[];
  };
  summary: Summary;
}

const fetchData = async (hotelId: string | undefined) => {
  const options = {
    method: "GET",
    url: "https://hotels-com-provider.p.rapidapi.com/v2/hotels/details",
    params: {
      domain: "AE",
      locale: "en_GB",
      hotel_id: hotelId,
    },
    headers: {
      "X-RapidAPI-Key": "85cb9d4329mshb935a0eadf15ac2p1ed939jsn2e0650e0c829",
      "X-RapidAPI-Host": "hotels-com-provider.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request<HotelData>(options);
    console.log("response.data: ", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch images");
  }
};

const useHotelData = (hotelId: string | undefined) => {
  return useQuery<HotelData, Error>(
    ["hotelData", hotelId],
    async () => fetchData(hotelId),
    {
      staleTime: 1000 * 60 * 5 * 60, // Data is considered fresh for 5 minutes (adjust as needed)
      refetchOnWindowFocus: false, // Disable refetch on window focus
    }
  );
};

export default useHotelData;
