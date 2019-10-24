import React from "react";
import "./MapContainer.css";

export const MapContainer = ({ handleClick }) => {
  return (
    <div className="MapC" onClick={handleClick}>
      <p>this is a map</p>
    </div>
  );
};
