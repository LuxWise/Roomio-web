"use client";
import { createContext, ReactNode, useState } from "react";
import {
  getHotelsService,
  getRoomByIdService,
  getRoomMediaByIdService,
  getRoomsByDestinationService,
  getRoomsService,
} from "@/services/HotelServices";
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

interface RoomType {
  name: string;
  description: string;
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
  roomTypetId: RoomType;
}

interface HotelContextType {
  hotels: Hotel[] | null;
  rooms: Room[] | null;
  room: Room | null;
  roomMedia: string[] | null;
  getHotels: () => Promise<void>;
  getRooms: () => Promise<void>;
  getRoomsByDestination: (destination: string) => Promise<void>;
  getRoomById: (id: string) => Promise<void>;
  getRoomMediaById: (id: string) => Promise<void>;
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
  const [room, setRoom] = useState<Room | null>(null);
  const [roomMedia, setRoomMedia] = useState<string[] | null>(null);

  const getRooms = async (): Promise<void> => {
    try {
      const res = await getRoomsService();
      if (res !== null) setRooms(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRoomsByDestination = async (descripción: string): Promise<void> => {
    try {
      const res = await getRoomsByDestinationService(descripción);
      if (res !== null) setRooms(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getHotels = async (): Promise<void> => {
    try {
      const res = await getHotelsService();
      if (res !== null) setHotels(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRoomById = async (id: string): Promise<void> => {
    try {
      const res = await getRoomByIdService(id);
      if (res !== null) setRoom(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRoomMediaById = async (id: string): Promise<void> => {
    try {
      const res = await getRoomMediaByIdService(id);
      if (res !== null) setRoomMedia(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HotelContext.Provider
      value={{
        rooms,
        hotels,
        room,
        roomMedia,
        getRooms,
        getRoomsByDestination,
        getHotels,
        getRoomById,
        getRoomMediaById,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};
