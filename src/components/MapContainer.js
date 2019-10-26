import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "./MapContainer.css";

function MapContainer({
  userLocation,
  onViewportChanged,
  onMapClick,
  markerData
}) {
  const [viewport, setViewport] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (viewport === null) {
      setViewport(userLocation);
    }
  }, [viewport, userLocation]);

  useEffect(() => {
    if (markerData && markerData.length > 0) {
      setMarkers(markerData);
    }
  }, [markerData]);

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
        className="Map"
        viewport={viewport}
        onClick={handleMapClick}
        onViewportChanged={handleMapViewportChanged}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />{" "}
        {markers.map(marker => (
          <Marker key={marker} position={marker.loc}>
            <Popup>{marker.name}</Popup>
          </Marker>
        ))}
      </Map>
    </div>
  );
}

export { MapContainer };
