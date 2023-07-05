import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Image {
  url: string | undefined;
  image: {
    url: string;
  };
  accessibilityText: string;
  imageId: string;
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
      "X-RapidAPI-Key": "ee576aa15dmsh3581ca25f23d503p10277bjsn714e9abfa151",
      "X-RapidAPI-Host": "hotels-com-provider.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data.propertyGallery.images[0].image.url);

    // Extract the images array from the response.data.propertyGallery object using the map method
    const images = response.data.propertyGallery.images.map((image: Image) => ({
      url: image.image.url,
      accessibilityText: image.accessibilityText,
      imageId: image.imageId,
    }));

    // Return the images array instead of the whole data object
    return images;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch images");
  }
};

const useHotelImages = (hotelId: string | undefined) => {
  return useQuery<Image[], Error>(["hotelImages", hotelId], () =>
    fetchImages(hotelId)
  );
};

export default useHotelImages;
