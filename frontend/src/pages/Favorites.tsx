import { useSelector } from "react-redux";

export const Favorites = () => {
  const hotels = useSelector((state: any) => state.hotel.value);

  console.log("Favorites hotels: ", hotels);
  console.log("Favorites hotels id: ", hotels.id);
  if (hotels.hotels.length === 0) {
    return <div>No favorites yet! Go to the hotels page and add some.</div>;
  }
  return (
    <div>
      <h1> Favorites</h1>
      {hotels &&
        hotels.hotels.map((hotel: any) => <div key={hotel.id}>{hotel.id}</div>)}
    </div>
  );
};
