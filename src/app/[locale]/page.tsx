"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { SyncLoader } from "react-spinners";

import Card from "@/components/molecules/Card";
import SearchBar from "@/components/molecules/SearchBar";
import useTheme from "@/hooks/useTheme";
import useScroll from "@/hooks/useScroll";
import LayoutHome from "@/layout/Home/layoutHome";
import Map from "@/public/jpg/map.jpg";
import useHotel from "@/hooks/useHotel";
import { useRouter } from "next/navigation";

export default function Home() {
  const { rooms, getRooms } = useHotel();
  const [loading, setLoading] = useState<boolean>(false);
  const isLight = useTheme(state => state.theme);
  const scroll = useScroll(state => state.scroll);
  const t = useTranslations("Home");
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const fetchRooms = async () => {
      await getRooms();
      setLoading(false);
    };
    fetchRooms();
  }, []);

  const handleRoom = (id: string) => {
    router.push(`rooms/${id}`);
  };

  const bgMain = isLight ? "bg-white" : "bg-[#181c25]";
  const textColor = isLight ? "text-black" : "text-white";
  const loaderColor = isLight ? "#587aff" : "#F1F1F1";

  const containerClass = [
    "flex flex-col items-center h-screen",
    bgMain,
    "transition-colors duration-500",
  ].join(" ");

  const mainClass = [
    "flex flex-col items-center w-full mt-14",
    bgMain,
    "transition-colors duration-500",
  ].join(" ");

  const mapSectionClass = [
    "hidden md:flex flex-col gap-10 justify-center items-center w-full",
    "bg-gradient-to-r from-[#dfd3d3] to-[#fef9fb]",
    "rounded-b-[4rem] lg:rounded-b-[8rem]",
    "select-none transition-colors duration-500",
  ].join(" ");

  const searchBarSectionClass = [
    scroll ? "sticky top-[65px]" : "absolute top-50",
    "z-20 flex justify-center transition-all duration-200",
  ].join(" ");

  const roomsSectionClass = [
    "grid grid-cols-2 md:grid-cols-3 md:grid-rows-2",
    "lg:grid-cols-5 lg:grid-rows-2",
    "md:gap-y-5 lg:gap-y-8",
    "py-10 md:py-14 lg:py-20",
    "md:px-12 lg:px-22",
  ].join(" ");

  return (
    <div className={containerClass}>
      <LayoutHome>
        <main className={mainClass}>
          <section className={mapSectionClass}>
            <Image
              src={Map}
              alt="map"
              className="md:w-4/6 lg:w-5/6 md:h-44 lg:h-44 object-cover"
            />
          </section>
          <section className={searchBarSectionClass}>
            <SearchBar />
          </section>
          {loading ? (
            <div className="mt-28">
              <SyncLoader color={loaderColor} />
            </div>
          ) : (
            <section className={roomsSectionClass}>
              {rooms &&
                rooms.map(room => (
                  <Card
                    key={room.id}
                    name={room.hotelId.name}
                    img="https://roomio.blob.core.windows.net/roomio-hotels/57d01297-ec68-4f71-b042-d883a6b4f734-hotel fontana (3).jpg"
                    ubication={`${room.hotelId.city}, ${room.hotelId.country}`}
                    price={`$ ${room.price} ${t("price")}`}
                    textColor={textColor}
                    shadow={isLight ? "blue" : "white"}
                    onClick={() => handleRoom(room.id)}
                  />
                ))}
            </section>
          )}
        </main>
      </LayoutHome>
    </div>
  );
}
