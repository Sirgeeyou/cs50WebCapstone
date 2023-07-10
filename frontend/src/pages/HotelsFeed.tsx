import { useState } from "react";
import { Hotels } from "../components/Hotels";
import UserInput from "../components/userInput";

export const HotelsFeed = () => {
  const [selectedDates, setSelectedDates] = useState<{
    checkInDate: string | null;
    checkOutDate: string | null;
  }>({
    checkInDate: null,
    checkOutDate: null,
  });

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

  return (
    <div>
      <UserInput onFormSubmit={onFormSubmit} />
      <Hotels
        checkin_date={selectedDates.checkInDate}
        checkout_date={selectedDates.checkOutDate}
      />
    </div>
  );
};
