import { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";

interface SearchBarProps {
  onGaiaIdChange: (id: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onGaiaIdChange }) => {
  const [country, setCountry] = useState("");
  const [cancelToken, setCancelToken] = useState<CancelTokenSource | null>(
    null
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCountry(value);
  };

  useEffect(() => {
    console.log("City:", country);

    const fetchRegion = async (
      country: string,
      cancelToken: CancelTokenSource
    ) => {
      const options = {
        method: "GET",
        url: "https://hotels-com-provider.p.rapidapi.com/v2/regions",
        params: {
          locale: "en_GB",
          query: `${country}`,
          domain: "AE",
        },
        headers: {
          "X-RapidAPI-Key":
            "4776429fafmsh65f3a3ac6bac0c7p154733jsnbfff06f893d5",
          "X-RapidAPI-Host": "hotels-com-provider.p.rapidapi.com",
        },
        cancelToken: cancelToken.token, // Set the cancel token
      };

      try {
        const response = await axios.request(options);
        if (response.data.data.length > 0) {
          const firstElement = response.data.data[0];
          const gaiaId = firstElement?.gaiaId;
          onGaiaIdChange(gaiaId);
        } else {
          console.log("No data found");
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error(error);
        }
      }
    };

    const source = axios.CancelToken.source();
    setCancelToken(source);

    if (country) {
      fetchRegion(country, source);
    }

    return () => {
      if (source) {
        source.cancel("Component unmounted"); // Cancel the request if it's still pending
      }
    };
  }, [country, onGaiaIdChange]);

  return (
    <div>
      <input
        onChange={handleInputChange}
        value={country}
        type="text"
        placeholder="Search for a city"
        className="input w-full max-w-xs text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
      />
    </div>
  );
};
