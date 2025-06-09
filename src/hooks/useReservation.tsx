"use client";
import { RerservationContext } from "@/context/ReservationContext";
import { useContext } from "react";

function useReservation() {
  const reservationContext = useContext(RerservationContext);

  if (!reservationContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return reservationContext;
}

export default useReservation;
