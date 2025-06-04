"use client";
import LayoutHome from "@/layout/Home/layoutHome";
import React, { useEffect, useState } from "react";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import useTheme from "@/hooks/useTheme";
import useHotel from "@/hooks/useHotel";
import { MapPinCheckInside } from "lucide-react";
import Typography from "@/components/atoms/Typography";
import Image from "next/image";

const MapPage = () => {
  const { hotels, getHotels } = useHotel();
  const [openPopUpId, setOpenPopUpId] = useState<string | null>(null);
  const isLigth = useTheme(state => state.theme);

  useEffect(() => {
    const fetchHotels = async () => {
      await getHotels();
    };
    fetchHotels();
  }, []);

  const handlePopUp = (id: string) => {
    setOpenPopUpId(prev => (prev === id ? null : id));
  };

  const bgMarker = isLigth ? "bg-[#1d63ed]" : "bg-[#FFFFFF]";
  const colorMarker = isLigth ? "#FFFFFF" : "#1d63ed";

  return (
    <section className="w-full h-full overflow-y-hidden">
      <LayoutHome>
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX}
          style={{
            width: "100%",
            height: "100%",
            marginTop: "3.5rem",
          }}
          mapStyle={
            isLigth
              ? "mapbox://styles/mapbox/streets-v9"
              : "mapbox://styles/luxwise/cmbfbcafm001q01sd04be8ofc"
          }
          initialViewState={{
            latitude: 4.611046,
            longitude: -74.147984,
            zoom: 10,

            fitBoundsOptions: {
              padding: 50,
              maxZoom: 10,
            },
          }}
          maxZoom={14}
          minZoom={5}
        >
          <NavigationControl />

          {hotels &&
            hotels.map(hotel => (
              <React.Fragment key={hotel.id}>
                <Marker
                  latitude={hotel.coordinatesLatitude}
                  longitude={hotel.coordinatesLongitude}
                  onClick={() => handlePopUp(hotel.id)}
                  className="flex flex-col items-center relative"
                >
                  <div
                    className={`${bgMarker} rounded-full max-w-8 p-1 cursor-pointer`}
                  >
                    <MapPinCheckInside color={colorMarker} />
                  </div>
                </Marker>

                {openPopUpId === hotel.id && (
                  <Popup
                    latitude={hotel.coordinatesLatitude}
                    longitude={hotel.coordinatesLongitude}
                    offset={30}
                    closeButton={false}
                    onClose={() => setOpenPopUpId(null)}
                    closeOnClick={false}
                    anchor="bottom"
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col gap-2 items-center w-36">
                      <Image
                        src={hotel.frontImage}
                        alt=""
                        width={140}
                        height={120}
                        unoptimized
                        className="rounded-xl"
                      />
                      <Typography variant="h5">{hotel.name}</Typography>
                    </div>
                  </Popup>
                )}
              </React.Fragment>
            ))}
        </Map>
      </LayoutHome>
    </section>
  );
};

export default MapPage;
