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
    console.log("Country:", country);

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
            "e711aeaa65msh9b6c7c0d8ecae17p1c4087jsnd1ee107f85c9",
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
      source.cancel("Component unmounted"); // Cancel the request on cleanup
    };
  }, [country, onGaiaIdChange]);

  return (
    <div>
      <input
        onChange={handleInputChange}
        value={country}
        type="text"
        placeholder="Search for a country"
        className="input w-full max-w-xs text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
      />
    </div>
  );
};
