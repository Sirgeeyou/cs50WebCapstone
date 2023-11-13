import Axios, { CancelTokenSource } from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

interface HotelApiResponse {
  id: string;
  name: string;
  propertyImage: {
    image: {
      url: string;
    };
  };
}
export interface HotelProps {
  checkin_date: string | null;
  checkout_date: string | null;
  gaiaId: string | null;
  numAdults: string;
}

const fetchData = async (
  { checkin_date, checkout_date, gaiaId, numAdults }: HotelProps,
  cancelToken: CancelTokenSource
) => {
  console.log("fetchData: ", checkin_date, checkout_date);
  const options = {
    method: "GET",
    url: "https://hotels-com-provider.p.rapidapi.com/v2/hotels/search",
    params: {
      domain: "AE",
      sort_order: "REVIEW",
      locale: "en_GB",
      checkout_date: checkout_date,
      region_id: `${gaiaId}`,
      adults_number: numAdults,
      checkin_date: checkin_date,
      available_filter: "SHOW_AVAI LABLE_ONLY",
      meal_plan: "FREE_BREAKFAST",
      guest_rating_min: "8",
      price_min: "10",
      page_number: "1",
      children_ages: "4,0,15",
      amenities: "WIFI,PARKING",
      price_max: "500",
      lodging_type: "HOTEL,HOSTEL,APART_HOTEL",
      payment_type: "PAY_LATER,FREE_CANCELLATION",
      star_rating_ids: "3,4,5",
    },
    headers: {
      "X-RapidAPI-Key": "4776429fafmsh65f3a3ac6bac0c7p154733jsnbfff06f893d5",
      "X-RapidAPI-Host": "hotels-com-provider.p.rapidapi.com",
    },
  };
  console.log("options: ", options);
  try {
    const response = await Axios.request(options);
    console.log(response.data);
    console.log("HotelsFeed");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const Hotels: React.FC<HotelProps> = ({
  checkin_date,
  checkout_date,
  gaiaId,
  numAdults,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  console.log("HotelsFeed: ", checkin_date, checkout_date);

  const [sortByPrice, setSortByPrice] = useState<"asc" | "desc" | "">(() => "");

  const [favoriteHotels, setFavoriteHotels] = useState<any>([]);

  const { data, isLoading, error } = useQuery(
    ["hotels", checkin_date, checkout_date, gaiaId, numAdults],
    () =>
      fetchData(
        { checkin_date, checkout_date, gaiaId, numAdults },
        Axios.CancelToken.source()
      )
  );
  const getTokenFromLocalStorage = () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      console.log("user.jwtToken: ", user.jwtToken);
      return user.jwtToken;
    }
    return null;
  };
  const jwtToken = getTokenFromLocalStorage();
  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  const fetchFavoriteHotels = () => {
    Axios.get("http://localhost:8000/favorite_hotels/", config)
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
    console.log("FAVORITESSSSS HOTELSSS: ", favoriteHotels);
  }, []);

  const [newHotel, setNewHotel] = useState<any>({
    hotelId: "",
    hotelName: "",
    imgUrl: "",
  });

  // Wait for favorite hotels to be fetched before rendering
  if (isLoading || favoriteHotels === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (!data || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  const removeFavoriteHotel = (hotelId: string) => {
    console.log("handleRemoveHotel called");
    console.log("hotelId: ", hotelId);
    const intHotelId = parseInt(hotelId);
    console.log("intHotelId: ", intHotelId);

    Axios.delete(`http://localhost:8000/remove_hotel/${intHotelId}/`, config)
      .then((response) => {
        console.log(response.data.message);
        fetchFavoriteHotels();
        toast("Hotel removed from favorites");
      })
      .catch((error) => {
        console.error("Error removing hotel from favorites: ", error);
      });
  };

  const addFavoriteHotel = (hotel: any) => {
    // Send request to add the hotel to favorites
    const hotelData = {
      hotelId: hotel.id,
      hotelName: hotel.name,
      imgUrl: hotel.propertyImage.image.url,
    };

    Axios.post("http://127.0.0.1:8000/add_hotel/", hotelData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((res) => {
        if (res.status === 201) {
          // Update local state by adding the hotel to favorites
          setFavoriteHotels((prevFavorites: any) => [
            ...prevFavorites,
            hotelData,
          ]);
          toast.success("Hotel added to your Favorites");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleFavorite = (hotel: any) => {
    const existingFavorite = favoriteHotels.find(
      (favoriteHotel: any) => favoriteHotel.hotelId === hotel.id
    );

    if (existingFavorite) {
      removeFavoriteHotel(existingFavorite.hotelId);
    } else {
      addFavoriteHotel(hotel);
    }
  };

  const handlePrice = () => {
    setSortByPrice((prevSort) => {
      if (prevSort === "asc") return "desc";
      if (prevSort === "desc") return "asc";
      return "asc"; // Default to ascending order
    });
  };

  const sortedHotels = [...(data?.properties || [])].sort((a, b) => {
    if (sortByPrice === "asc") {
      return a.price.lead.amount - b.price.lead.amount;
    } else if (sortByPrice === "desc") {
      return b.price.lead.amount - a.price.lead.amount;
    } else {
      return 0;
    }
  });

  return (
    <div className="relative">
      <div className="flex flex-wrap justify-center">
        <button onClick={handlePrice} className="btn btn-primary mt-3 mx-auto">
          Sort by Price {sortByPrice === "asc" ? "↑" : "↓"}
        </button>
      </div>

      <div className="flex flex-wrap justify-center">
        {sortedHotels?.map((hotel: any, key: any) => (
          <div key={key} className="w-96 mx-2">
            <div className="card shadow-xl mt-5">
              <figure className="flex justify-center rounded-t-lg overflow-hidden">
                <FontAwesomeIcon
                  icon={
                    favoriteHotels.some(
                      (favoriteHotel: any) => favoriteHotel.hotelId === hotel.id
                    )
                      ? faHeart
                      : faHeartOutline
                  }
                  className="absolute top-1 left-1 text-red-500 text-xl cursor-pointer"
                  onClick={() => {
                    toggleFavorite(hotel);
                  }}
                />

                <img
                  src={hotel.propertyImage?.image?.url || "default-image-url"}
                  className="card-image rounded-t-lg w-full h-auto"
                  alt={hotel.propertyImage?.image?.url}
                />
                <div className="absolute top-1 right-1 bg-blue-500 px-2 py-1 text-white rounded-lg flex items-center space-x-1 mr-2">
                  <div
                    className="tooltip"
                    data-tip={`Reviews: ${hotel.reviews?.total}`}
                  >
                    <span className="mr-1">
                      <FontAwesomeIcon icon={faStar} />
                    </span>

                    {hotel.reviews?.score}
                  </div>
                </div>
              </figure>

              <div className="card-body rounded-lg bg-slate-800">
                <h2 className="card-title text-light">{hotel.name}</h2>
                <div className="flex gap-1">
                  {hotel.offerSummary?.messages?.map(
                    (message: any, key: any) => (
                      <div
                        key={key}
                        className={`badge flex items-center ${
                          key === 0
                            ? "badge-primary"
                            : key === 1
                            ? "badge-secondary"
                            : ""
                        }  ${key === 1 ? "" : ""}`}
                      >
                        {message.message}
                      </div>
                    )
                  )}
                </div>

                <div className="card-actions justify-end ">
                  <p className="text-light mt-3.5 ml-0.5 font-bold">
                    ${hotel.price.lead.amount.toFixed(0)}/night
                  </p>
                  <button
                    className="btn btn-primary "
                    onClick={() => navigate(`/hotels/${hotel.id}`)}
                  >
                    Visit now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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
  );
};
