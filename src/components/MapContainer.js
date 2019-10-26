import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "./MapContainer.css";

function MapContainer({
  viewLocation,
  userLocation,
  onViewportChanged,
  onMapClick,
  markerData
}) {
  const [viewport, setViewport] = useState(null);

  useEffect(() => {
    if (viewport === null) {
      setViewport(userLocation);
    }
  }, [viewport, userLocation]);

  useEffect(() => {
    console.log("[MapContainer.js] viewport changed to", viewport);
  }, [viewport]);

  const handleMapClick = e => {
    if (typeof onMapClick === "function") {
      onMapClick(e.latlng);
    }
  };

  const handleMapViewportChanged = viewport => {
    setViewport(viewport);
    if (typeof onViewportChanged === "function") {
      onViewportChanged(viewport);
    }
  };

  return (
    <div className="Map-Container">
      <Map
        minZoom={15}
        maxZoom={18}
        zoomControl={false}
        className="Map"
        viewport={viewLocation}
        onClick={handleMapClick}
        onViewportChanged={handleMapViewportChanged}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markerData.map(marker => {
          const icon = new Icon({ iconUrl: "./user.png", iconSize: [30, 30] });
          return (
            <Marker
              key={`${marker.loc[0]}+${marker.loc[1]}+${marker.name}`}
              position={marker.loc}
              icon={icon}
            >
              <Popup>{marker.name}</Popup>
            </Marker>
          );
        })}
      </Map>
    </div>
  );
}

export { MapContainer };
