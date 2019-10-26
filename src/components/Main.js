import React, { useState, useEffect } from "react";
import { auth, firestore } from "firebase";
import "./Main.css";
import { MapContainer } from "./MapContainer";
import { AddForm } from "./AddForm";

//Newly added TABS
import Tabs from "./Tabs";
require("./Tab.css");

const devMarkerData = [
  {
    name: "this is a marker",
    loc: [22.42, 114.207]
  }
];

export const Main = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userLocation, setUserLocation] = useState();
  const [viewLocation, setViewLocation] = useState({
    center: [22.42, 114.207],
    zoom: 13
  });
  const [markerData, setMarkerData] = useState([]);
  const [AddFormDisplay, setAddFormDisplay] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos =>
      setUserLocation({ center: [pos.coords.latitude, pos.coords.longitude] })
    );
  });

  useEffect(() => {
    setUserInfo(auth().currentUser);
    console.log("[Main.js] current user is", auth().currentUser);
  }, []);

  const getRegion = loc => [
    `${(loc[0] + 0.1).toFixed(1)}+${(loc[1] + 0.1).toFixed(1)}`,
    `${(loc[0] + 0.1).toFixed(1)}+${(loc[1] - 0.1).toFixed(1)}`,
    `${(loc[0] + 0.1).toFixed(1)}+${loc[1].toFixed(1)}`,
    `${(loc[0] - 0.1).toFixed(1)}+${(loc[1] + 0.1).toFixed(1)}`,
    `${(loc[0] - 0.1).toFixed(1)}+${(loc[1] - 0.1).toFixed(1)}`,
    `${(loc[0] - 0.1).toFixed(1)}+${loc[1].toFixed(1)}`,
    `${loc[0].toFixed(1)}+${(loc[1] + 0.1).toFixed(1)}`,
    `${loc[0].toFixed(1)}+${(loc[1] - 0.1).toFixed(1)}`,
    `${loc[0].toFixed(1)}+${loc[1].toFixed(1)}`
  ];

  useEffect(() => {
    const listeners = [];
    for (const region of getRegion(viewLocation.center)) {
      console.log(region);
      listeners.push(
        firestore()
          .collection("test")
          .doc("test")
          .collection(region)
          .onSnapshot(snap => {
            let markerTemp = markerData;
            snap.forEach(doc => {
              let tmp = doc.data();
              tmp.loc[0] = parseFloat(tmp.loc[0]);
              tmp.loc[1] = parseFloat(tmp.loc[1]);
              markerTemp.push(tmp);
            });
            setMarkerData(markerTemp);
            console.log(markerData);
          })
      );
    }

    return () => {
      for (const unsubscribe of listeners) {
        unsubscribe();
      }
    };
  }, [markerData, viewLocation]);

  return (
    <div className="Main">
      <header className="Main-header">
        <MapContainer
          userLocation={viewLocation}
          onViewportChanged={viewport =>
            console.log("[Main.js] viewport changed", viewport)
          }
          onMapClick={latlng => console.log("[Main.js] Map clicked", latlng)}
          markerData={markerData}
        />

        <Tabs>
          <div label="Discount">OOoooo free stuff?</div>
          <div label="Events">what's happening around</div>
          <div label="Incidents">omg teargass</div>
        </Tabs>

        <button onClick={() => auth().signOut()}>sign out</button>
        {AddFormDisplay ? (
          <AddForm toggleForm={setAddFormDisplay} />
        ) : (
          <button
            className="fab"
            onClick={() => setAddFormDisplay(!AddFormDisplay)}
          >
            +
          </button>
        )}
      </header>
    </div>
  );
};
