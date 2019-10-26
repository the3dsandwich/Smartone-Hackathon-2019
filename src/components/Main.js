import React, { useState, useEffect } from "react";
import { auth } from "firebase";
import "./Main.css";
import { MapContainer } from "./MapContainer";


//Newly added TABS
import Tabs from './Tabs';
require("./Tab.css");

const devMarkerData = [
  {
    name: "this is a marker",
    loc: [22.42, 114.207]
  }
];

export const Main = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userLocation, setUserLocation] = useState({
    center: [22.42, 114.207],
    zoom: 13
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos =>
      setUserLocation({ center: [pos.coords.latitude, pos.coords.longitude] })
    );
  });

  useEffect(() => {
    setUserInfo(auth().currentUser);
    console.log("[Main.js] current user is", auth().currentUser);
  }, []);

  return (
    <div className="Main">
      <header className="Main-header">
        <MapContainer
          userLocation={userLocation}
          onViewportChanged={viewport =>
            console.log("[Main.js] viewport changed", viewport)
          }
          onMapClick={latlng => console.log("[Main.js] Map clicked", latlng)}
          markerData={devMarkerData}
        />

        <Tabs>
          <div label = "Discount">
            OOoooo free stuff?
          </div>
          <div label = "Events">
            what's happening around
          </div>
          <div label = "Incidents">
            omg teargass
          </div>
        </Tabs>

        <button onClick={() => auth().signOut()}>sign out</button>
      </header>
    </div>
  );
};
