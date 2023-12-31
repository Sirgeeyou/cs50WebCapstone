import axios from "axios";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { config } from "process";

export const Favorites = () => {
  const [favoriteHotels, setFavoriteHotels] = useState([]);
  const [loading, setLoading] = useState(true);

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
  const handleRemoveHotel = (hotelId: string) => {
    console.log("handleRemoveHotel called");
    console.log("hotelId: ", hotelId);
    const intHotelId = parseInt(hotelId);
    console.log("intHotelId: ", intHotelId);

    axios
      .delete(`http://localhost:8000/remove_hotel/${intHotelId}/`, config)
      .then((response) => {
        console.log(response.data.message);
        fetchFavoriteHotels();
        toast("Hotel removed from favorites");
      })
      .catch((error) => {
        console.error("Error removing hotel from favorites: ", error);
      });
  };

  const fetchFavoriteHotels = () => {
    axios
      .get("http://localhost:8000/favorite_hotels/", config)
      .then((response) => {
        // Handle the response data
        console.log("Favorite hotels: ", response.data);
        setFavoriteHotels(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching favorite hotels: ", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFavoriteHotels();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  console.log("Favorites hotels id: ", favoriteHotels);

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
                onClick={() => handleRemoveHotel(String(hotel.hotelId))}
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
      <div>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
};
