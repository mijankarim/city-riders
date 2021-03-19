import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = () => {
  return (
    <MapContainer center={[22.3660, 91.8288]} zoom={13} scrollWheelZoom={false} style={{width:"100%", height:"600px"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[22.3660, 91.8288]}>
        <Popup>
          Chittagong
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
