import axios, { CancelTokenSource } from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface HotelProps {
  checkin_date: string | null;
  checkout_date: string | null;
}

const fetchData = async (
  { checkin_date, checkout_date }: HotelProps,
  cancelToken: CancelTokenSource
) => {
  const presetDay = new Date();
  console.log("fetchData: ", checkin_date, checkout_date);
  const options = {
    method: "GET",
    url: "https://hotels-com-provider.p.rapidapi.com/v2/hotels/search",
    params: {
      domain: "AE",
      query: "dubai",
      sort_order: "REVIEW",
      locale: "en_GB",
      checkout_date: checkout_date || presetDay.toISOString().split("T")[0],
      region_id: "2872",
      adults_number: "1",
      checkin_date: checkin_date || presetDay.toISOString().split("T")[0],
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
      "X-RapidAPI-Key": "ee576aa15dmsh3581ca25f23d503p10277bjsn714e9abfa151",
      "X-RapidAPI-Host": "hotels-com-provider.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    console.log("HotelsFeed");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const Hotels: React.FC<HotelProps> = ({
  checkin_date,
  checkout_date,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  console.log("HotelsFeed: ", checkin_date, checkout_date);

  const { data, isLoading, error } = useQuery(
    ["hotels", checkin_date, checkout_date], // Include checkin_date and checkout_date as part of the query key
    () => fetchData({ checkin_date, checkout_date }, axios.CancelToken.source())
  );

  if (!data || isLoading) {
    return <div>Loading...</div>;
  }

  // Use the fetched data here
  console.log(data);
  console.log("checkInDate, checkOutDate: ", checkin_date, checkout_date);
  return (
    <div className="flex flex-wrap justify-center ">
      {data?.properties?.map((hotel: any, key: any) => (
        <div key={key} className="w-96 mx-2">
          <div className="card shadow-xl mt-5">
            <figure className="flex justify-center rounded-t-lg overflow-hidden">
              <img
                src={hotel.propertyImage.image.url}
                alt="Shoes"
                className="card-image rounded-t-lg w-full h-auto"
              />
            </figure>
            <div className="card-body  rounded-lg bg-slate-800">
              <h2 className="card-title text-light">{hotel.name}</h2>
              <p className="text-light">
                If a dog chews shoes, whose shoes does he choose?
              </p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
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