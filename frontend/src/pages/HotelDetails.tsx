import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Gallery from "../components/Gallery";

type HotelDetailsProps = {
  hotelId: any;
};

interface Image {
  url: string | undefined;
  image: {
    url: string;
  };
  accessibilityText: string;
  imageId: string;
}

const fetchData = async (hotelId: any) => {
  const options = {
    method: "GET",
    url: "https://hotels-com-provider.p.rapidapi.com/v2/hotels/details",
    params: {
      domain: "AE",
      locale: "en_GB",
      hotel_id: hotelId,
    },
    headers: {
      "X-RapidAPI-Key": "d23f859a7fmsh65d57e62c22ee7fp150a77jsnd3afc540a378",
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
  }
};

// Define a component that takes the images array as a prop and renders each image using the img tag
const Images = ({ images }: { images: Image[] }) => {
  console.log(images);
  return (
    <div>
      {images.map((image) => (
        <img
          src={image?.url}
          alt={image.accessibilityText}
          key={image.imageId}
        />
      ))}
    </div>
  );
};

export const HotelDetails = () => {
  const { hotelId } = useParams();
  console.log("HotelDetails");
  console.log(hotelId);

  // Use the useQuery hook to fetch the images array using the fetchData function
  const { data, isLoading, error } = useQuery<Image[]>(["hotel", hotelId], () =>
    fetchData(hotelId)
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      {/* Use the Images component and pass the data array as a prop */}

      <Images images={data ?? []} />
      <p>HotelDetails</p>
    </div>
  );
};
