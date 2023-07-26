import { useSelector } from "react-redux";

export const Favorites = () => {
  const hotels = useSelector((state: any) => state.hotel.value);

  console.log("Favorites hotels: ", hotels);
  console.log("Favorites hotels id: ", hotels.id);
  return (
    <div>
      <h1> Favorites</h1>
      {hotels.id}
    </div>
  );
};
