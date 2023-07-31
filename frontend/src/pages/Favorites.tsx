import axios from "axios";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

export const Favorites = () => {
  const [favoriteHotels, setFavoriteHotels] = useState([]);

  const handleRemoveHotel = (hotelId: string) => {
    console.log("handleRemoveHotel called");
    console.log("hotelId: ", hotelId);
    const intHotelId = parseInt(hotelId);
    console.log("intHotelId: ", intHotelId);

    // Get the JWT token from local storage
    const getTokenFromLocalStorage = () => {
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        console.log("user.jwtToken: ", user.jwtToken);
        return user.jwtToken;
      }
      return null;
    };

    const token = getTokenFromLocalStorage();
    console.log("token: ", token);
    // Include the JWT token in the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`http://localhost:8000/remove_hotel/${intHotelId}/`, config)
      .then((response) => {
        console.log(response.data.message);
        setFavoriteHotels((prevFavoriteHotels) =>
          prevFavoriteHotels.filter((hotel: any) => hotel.id !== intHotelId)
        );
      })
      .catch((error) => {
        console.error("Error removing hotel from favorites: ", error);
      });
  };

  const fetchFavoriteHotels = () => {
    axios
      .get("http://localhost:8000/favorite_hotels/")
      .then((response) => {
        // Handle the response data
        console.log("Favorite hotels: ", response.data);
        setFavoriteHotels(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching favorite hotels: ", error);
      });
  };

  useEffect(() => {
    fetchFavoriteHotels();
  }, []);

  console.log("Favorites hotels id: ", favoriteHotels);
  if (favoriteHotels.length === 0) {
    return <div>No favorites yet! Go to the hotels page and add some.</div>;
  }

  return (
    <div>
      <h1> Favorites</h1>
      <div className="grid grid-cols-4 gap-4">
        {favoriteHotels &&
          favoriteHotels.map((hotel: any) => (
            <div key={hotel.id} className="relative">
              {/* Image */}
              <img
                src={hotel.imgUrl}
                className="w-full h-64 object-cover rounded-lg"
                alt={hotel.hotelName}
              />

              {/* X icon */}
              <button
                onClick={() => handleRemoveHotel(hotel.hotelId)}
                className="circle-icon"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>

              <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{hotel.hotelName}</h2>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
