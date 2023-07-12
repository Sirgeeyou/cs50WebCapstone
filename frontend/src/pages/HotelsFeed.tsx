import { useState } from "react";
import { Hotels } from "../components/Hotels";
import UserInput from "../components/userInput";
import { addDays } from "date-fns";

export const HotelsFeed = () => {
  const [selectedDates, setSelectedDates] = useState<{
    checkInDate: string | null;
    checkOutDate: string | null;
  }>({
    checkInDate: null,
    checkOutDate: null,
  });

  const [gaiaId, setGaiaId] = useState<string>("2734");

  const handleGaiaIdChange = (id: string) => {
    setGaiaId(id);
  };

  const onFormSubmit = (
    checkInDate: Date | null,
    checkOutDate: Date | null
  ) => {
    const formattedCheckInDate =
      checkInDate?.toISOString().split("T")[0] || null;
    const formattedCheckOutDate =
      checkOutDate?.toISOString().split("T")[0] || null;
    setSelectedDates({
      checkInDate: formattedCheckInDate,
      checkOutDate: formattedCheckOutDate,
    });
  };
  console.log("HotelsFeed selectedDates: ", selectedDates);
  console.log("HotelsFeed gaiaId: ", gaiaId);
  return (
    <div>
      <UserInput
        onFormSubmit={onFormSubmit}
        onGaiaIdChange={handleGaiaIdChange}
      />

      <Hotels
        checkin_date={selectedDates.checkInDate}
        checkout_date={selectedDates.checkOutDate}
        gaiaId={gaiaId}
      />
    </div>
  );
};
