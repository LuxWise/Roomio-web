"use client";
import LayoutHome from "@/layout/Home/layoutHome";
import React from "react";
import Map, { NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import useTheme from "@/hooks/useTheme";

const MapPage = () => {
  const isLigth = useTheme(state => state.theme);

  return (
    <section className="w-full h-full overflow-y-hidden">
      <LayoutHome>
        <Map
          mapboxAccessToken="pk.eyJ1IjoibHV4d2lzZSIsImEiOiJjbTRoYXZzNXIwNHk2MmtvZ3IxeGduOHpxIn0.-C8Am0AAaFfr7okj8pCKag"
          style={{
            width: "100%",
            height: "100%",
            marginTop: "5rem",
          }}
          mapStyle={
            isLigth
              ? "mapbox://styles/mapbox/streets-v9"
              : "mapbox://styles/luxwise/cmbfbcafm001q01sd04be8ofc"
          }
          initialViewState={{
            latitude: 4.611046,
            longitude: -74.147984,
            zoom: 12,

            fitBoundsOptions: {
              padding: 50,
              maxZoom: 15,
            },
          }}
          maxZoom={16}
          minZoom={11}
        >
          <NavigationControl />
        </Map>
      </LayoutHome>
    </section>
  );
};

export default MapPage;
