import axios from "axios";
import React, { useEffect, useState } from "react";
import Booking from "./Booking";

const AccBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const axiosGet = async () => {
      const { data } = await axios.get("/bookings/owner");
      
      setBookings(data);
    };

    axiosGet();
  }, []);

  return (
    <div className="flex w-full max-w-6xl flex-col gap-4">
        
      {bookings.map((booking) => (
        <Booking booking={booking} key={booking._id} />
        
      ))}
    </div>
  );
};

export default AccBookings;
