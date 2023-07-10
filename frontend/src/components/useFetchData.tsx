import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchData = (hotelId: string | undefined) => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://hotels-com-provider.p.rapidapi.com/v2/hotels/details",
        params: {
          domain: "AE",
          locale: "en_GB",
          hotel_id: hotelId,
        },
        headers: {
          "X-RapidAPI-Key":
            "ee576aa15dmsh3581ca25f23d503p10277bjsn714e9abfa151",
          "X-RapidAPI-Host": "hotels-com-provider.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request({ ...options, timeout: 500 });
        console.log(response.data);
        console.log("useFetchData");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [hotelId]);

  return data;
};
