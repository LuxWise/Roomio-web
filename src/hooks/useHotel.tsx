"use client";
import { HotelContext } from "@/context/HotelContext";
import { useContext } from "react";

function useHotel() {
  const hotelContext = useContext(HotelContext);

  if (!hotelContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return hotelContext;
}

export default useHotel;
