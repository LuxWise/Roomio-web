"use client";
import Card from "@/components/molecules/Card";
import useTheme from "@/hooks/useTheme";
import LayoutHome from "@/layout/Home/layoutHome";
import Map from "@/public/jpg/map.jpg";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import SearchBar from "@/components/molecules/SearchBar";
import useScroll from "@/hooks/useScroll";

interface Rooms {
  id: number;
  hotelId: { name: string; city: string; country: string };
  price: string;
}

export default function Home() {
  const [rooms, setRooms] = useState<Array<Rooms>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const scroll = useScroll(state => state.scroll);

  useEffect(() => {
    setLoading(prev => !prev);
    const fetchRooms = async () => {
      const res = await axios.get("/api/hotel/rooms");
      setRooms(res.data.data);
      setLoading(prev => !prev);
    };
    fetchRooms();
  }, []);

  const isLight = useTheme(state => state.theme);
  const bgMain = isLight ? "bg-white" : "bg-[#181c25]";
  const textColor = isLight ? "text-black" : "text-white";

  return (
    <div
      className={`flex flex-col items-center h-screen ${bgMain} transition-colors duration-500`}
    >
      <LayoutHome>
        <main
          className={`flex flex-col items-center w-full ${bgMain} transition-colors duration-500 mt-20`}
        >
          <section
            className={`flex flex-col gap-10 justify-center items-center w-full bg-gradient-to-r from-[#dfd3d3] to-[#fef9fb] rounded-b-[10rem] select-none transition-colors duration-500`}
          >
            <Image src={Map} alt="dsa" className="w-5/6 h-52 object-cover" />
          </section>

          <section
            className={`${
              scroll ? "sticky top-[100px]" : "absolute top-64"
            }   z-20 flex justify-center transition-all duration-200`}
          >
            <SearchBar />
          </section>

          <section className="grid grid-cols-4 grid-rows-2 gap-x-10 gap-y-8 py-20 px-40">
            {loading ? (
              <div>cargando</div>
            ) : (
              rooms.map(room => (
                <Card
                  key={room.id}
                  name={room.hotelId.name}
                  img={
                    "https://roomio.blob.core.windows.net/roomio-hotels/57d01297-ec68-4f71-b042-d883a6b4f734-hotel fontana (3).jpg"
                  }
                  ubication={`${room.hotelId.city}, ${room.hotelId.country}`}
                  price={room.price}
                  textColor={textColor}
                  shadow={isLight ? "blue" : "white"}
                />
              ))
            )}
          </section>
        </main>
      </LayoutHome>
    </div>
  );
}
