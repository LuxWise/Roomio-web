"use client";
import { createContext, ReactNode } from "react";
import { postReservationService } from "@/services/ReservationServices";
import { useRouter } from "next/navigation";

interface Reservation {
  start: string;
  end: string;
  id: string;
}

interface ReservationContextType {
  postReservation: ({ start, end, id }: Reservation) => Promise<void>;
}

interface ReservationProviderProps {
  children: ReactNode;
}

export const RerservationContext = createContext<
  ReservationContextType | undefined
>(undefined);

export const ReservationProvider = ({ children }: ReservationProviderProps) => {
  const router = useRouter();

  const postReservation = async ({
    start,
    end,
    id,
  }: Reservation): Promise<void> => {
    try {
      await postReservationService({ start, end, id });
      router.push("/reservation/success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RerservationContext.Provider
      value={{
        postReservation,
      }}
    >
      {children}
    </RerservationContext.Provider>
  );
};
