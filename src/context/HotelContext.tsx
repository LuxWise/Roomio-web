"use client";
import { createContext, ReactNode, useState } from "react";
import { hotel, room } from "@/services/HotelServices";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface Hotel {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
  frontImage: string | StaticImport;
  email: string;
  coordinatesLatitude: number;
  coordinatesLongitude: number;
}

interface Room {
  id: string;
  name: string;
  description: string;
  numberOfBeds: number;
  numberOfBathrooms: number;
  numberOfPeople: number;
  numberOfPets: number;
  numberOfKids: number;
  availableKids: boolean;
  availablePets: boolean;
  price: number;
  hotelId: Hotel;
}

interface HotelContextType {
  hotels: Hotel[] | null;
  rooms: Room[] | null;
  getHotels: () => Promise<void>;
  getRooms: () => Promise<void>;
}

interface HotelProviderProps {
  children: ReactNode;
}

export const HotelContext = createContext<HotelContextType | undefined>(
  undefined
);

export const HotelProvider = ({ children }: HotelProviderProps) => {
  const [hotels, setHotels] = useState<Hotel[] | null>(null);
  const [rooms, setRooms] = useState<Room[] | null>(null);

  const getRooms = async (): Promise<void> => {
    try {
      const res = await room();
      if (res !== null) setRooms(res.data);
    } catch (error) {
      // Puedes manejar el error aquí si lo necesitas
    }
  };

  const getHotels = async (): Promise<void> => {
    try {
      const res = await hotel();
      if (res !== null) setHotels(res.data);
    } catch (error) {
      // Puedes manejar el error aquí si lo necesitas
    }
  };

  return (
    <HotelContext.Provider
      value={{
        rooms,
        hotels,
        getRooms,
        getHotels,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};
