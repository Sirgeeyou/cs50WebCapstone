import axios, { CancelTokenSource } from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface HotelProps {
  checkin_date: string | null;
  checkout_date: string | null;
  gaiaId: string | null;
}

const fetchData = async (
  { checkin_date, checkout_date, gaiaId }: HotelProps,
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
      adults_number: "1",
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
      "X-RapidAPI-Key": "e711aeaa65msh9b6c7c0d8ecae17p1c4087jsnd1ee107f85c9",
      "X-RapidAPI-Host": "hotels-com-provider.p.rapidapi.com",
    },
  };
  console.log("options: ", options);
  try {
    const response = await axios.request(options);
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
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  console.log("HotelsFeed: ", checkin_date, checkout_date);

  const [sortByPrice, setSortByPrice] = useState<"asc" | "desc" | "">(() => "");

  const { data, isLoading, error } = useQuery(
    ["hotels", checkin_date, checkout_date, gaiaId],
    () =>
      fetchData(
        { checkin_date, checkout_date, gaiaId },
        axios.CancelToken.source()
      )
  );

  if (!data || isLoading) {
    return <div>Loading...</div>;
  }

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
    <div className="flex flex-wrap justify-center">
      <div className="flex flex-wrap">
        <button onClick={handlePrice} className="btn btn-primary mt-3 mx-auto">
          Sort by Price {sortByPrice === "asc" ? "↑" : "↓"}
        </button>
      </div>

      {sortedHotels?.map((hotel: any, key: any) => (
        <div key={key} className="w-96 mx-2">
          <div className="card shadow-xl mt-5">
            <figure className="flex justify-center rounded-t-lg overflow-hidden">
              <img
                src={hotel.propertyImage.image.url}
                alt="Shoes"
                className="card-image rounded-t-lg w-full h-auto"
              />
            </figure>
            <div className="card-body rounded-lg bg-slate-800">
              <h2 className="card-title text-light">{hotel.name}</h2>
              <div className="flex">
                {hotel.offerSummary?.messages?.map((message: any, key: any) => (
                  <div
                    key={key}
                    className={`badge ${
                      key === 0
                        ? "badge-primary"
                        : key === 1
                        ? "badge-secondary"
                        : ""
                    } flex items-center ${key === 1 ? "ml-2" : ""}`}
                  >
                    {message.message}
                  </div>
                ))}
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
  );
};
