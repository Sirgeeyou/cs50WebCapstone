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
  tagLine: string;
}

interface HotelData {
  propertyGallery: {
    images: Image[];
  };
  summary: Summary;
}

const fetchImages = async (hotelId: string | undefined) => {
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
    console.log(
      "response.data.propertyGallery.images: ",
      response.data.propertyGallery.images[0].image.url
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch images");
  }
};

const useHotelData = (hotelId: string | undefined) => {
  return useQuery<HotelData, Error>(["hotelData", hotelId], async () =>
    fetchImages(hotelId)
  );
};

export default useHotelData;
