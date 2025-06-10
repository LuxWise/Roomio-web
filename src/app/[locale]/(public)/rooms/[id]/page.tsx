"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useHotel from "@/hooks/useHotel";
import useTheme from "@/hooks/useTheme";
import LayoutHome from "@/layout/Home/layoutHome";
import ImageGallerySelector from "@/components/atoms/ImageGallerySelector";
import Typography from "@/components/atoms/Typography";
import {
  Bath,
  Bed,
  Cat,
  FishOff,
  PersonStanding,
  UsersRound,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import Button from "@/components/atoms/Button";
import ReservationSection from "@/components/molecules/ReservationSection";
import useReservation from "@/hooks/useReservation";

const RoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { postReservation } = useReservation();
  const { room, roomMedia, getRoomById, getRoomMediaById } = useHotel();
  const isLight = useTheme(state => state.theme);
  const [reservationData, setReservationData] = useState<{
    startDate: string;
    endDate: string;
    nights: number;
  } | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      if (!id) return;
      await getRoomById(id);
      await getRoomMediaById(id);
    };
    fetchRooms();
  }, [id]);

  const bgMain = isLight ? "bg-[#123fff]" : "bg-[#181c25]";
  const containerClass = `flex flex-col items-center h-screen ${bgMain} transition-colors duration-500`;

  return (
    <div className={containerClass}>
      <LayoutHome>
        {!room ? (
          <div></div>
        ) : (
          <section className="flex flex-col md:flex-row h-full px-2 md:px-10 py-28 md:py-20 bg-white gap-6 md:gap-8">
            <div className="flex flex-col w-full md:w-1/2 mb-6 md:mb-0">
              <div className="flex w-full justify-center pt-10">
                <ImageGallerySelector images={roomMedia!} />
              </div>
              <div
                className={`w-2/6 p-5 mt-4 flex flex-col items-center rounded-2xl ${
                  user && "bg-sky-200"
                }`}
              >
                {user ? (
                  <div className="flex flex-col items-center gap-5">
                    <div className=" flex gap-5 justify-center items-center">
                      <ReservationSection
                        onReservationChange={setReservationData}
                      />
                      <Typography variant="h6">Realizar reserva</Typography>
                    </div>
                    <Button
                      text="Reservar habitación"
                      bgColor="blue"
                      color="white"
                      rounded="xl"
                      className="px-8 py-3 text-lg font-semibold shadow-lg hover:bg-blue-700 transition"
                      onClick={() => {
                        if (!reservationData) {
                          alert("Selecciona un rango de fechas primero.");
                          return;
                        }
                        postReservation({
                          start: reservationData.startDate,
                          end: reservationData.endDate,
                          id: id,
                        });
                      }}
                    />
                  </div>
                ) : (
                  <Button
                    text="Inicia sesión para reservar"
                    bgColor="green"
                    color="white"
                    rounded="xl"
                    className="px-8 py-3 text-lg font-semibold shadow-lg hover:bg-gray-700 transition"
                    onClick={() => {
                      window.location.href = "/login";
                    }}
                  />
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-6 pb-18 md:pb-0">
              <div>
                <Typography variant="h1" className="mb-2 text-2xl md:text-4xl">
                  {room.name}
                </Typography>
                <Typography
                  variant="h3"
                  className="mb-4 text-gray-600 text-base md:text-xl"
                >
                  {room.description}
                </Typography>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                <div className="flex gap-2 items-center">
                  <Bed className="w-5" />
                  <Typography variant="h4">
                    {room.numberOfBeds} Camas
                  </Typography>
                </div>
                <div className="flex gap-2 items-center">
                  <Bath className="w-5" />
                  <Typography variant="h4">
                    {room.numberOfBathrooms} Baños
                  </Typography>
                </div>
                <div className="flex gap-2 items-center">
                  <UsersRound className="w-5" />
                  <Typography variant="h4">
                    {room.numberOfPeople} Personas
                  </Typography>
                </div>
                <div className="flex gap-2 items-center">
                  <PersonStanding className="w-5" />
                  <Typography variant="h4">
                    {room.numberOfKids} Niños
                  </Typography>
                </div>
                <div className="flex gap-2 items-center">
                  {room.availablePets ? (
                    <>
                      <Cat className="w-5" />
                      <Typography variant="h4">
                        {room.numberOfPets} Mascotas
                      </Typography>
                    </>
                  ) : (
                    <>
                      <FishOff className="w-5" />
                      <Typography variant="h4">0 Mascotas</Typography>
                    </>
                  )}
                </div>
                <div className="flex gap-2 items-center">
                  <Typography variant="h4">${room.price} / noche</Typography>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-4 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    room.availableKids
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {room.availableKids
                    ? "Niños permitidos"
                    : "Niños no permitidos"}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    room.availablePets
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {room.availablePets
                    ? "Mascotas permitidas"
                    : "Mascotas no permitidas"}
                </span>
              </div>
              <div className="mb-4">
                <Typography variant="h5" className="font-semibold">
                  Tipo: {room.roomTypetId.name}
                </Typography>
                <Typography variant="body" className="text-gray-500">
                  {room.roomTypetId.description}
                </Typography>
              </div>
              <div className="p-4 rounded-lg border bg-gray-50">
                <Typography variant="h4" className="font-semibold mb-1">
                  {room.hotelId.name}
                </Typography>
                <Typography variant="body" className="text-gray-600">
                  {room.hotelId.address}, {room.hotelId.city},
                  {room.hotelId.state}, {room.hotelId.country}
                </Typography>
                <Typography variant="body" className="text-gray-600">
                  Tel: {room.hotelId.phoneNumber}
                </Typography>
                <Typography variant="body" className="text-gray-600">
                  Email: {room.hotelId.email}
                </Typography>
              </div>
            </div>
          </section>
        )}
      </LayoutHome>
    </div>
  );
};

export default RoomPage;
