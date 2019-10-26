import React, { useState, useEffect } from "react";
import { auth, firestore } from "firebase";
import "./Main.css";
import { MapContainer } from "./MapContainer";

const devMarkerData = [{ loc: [22.415, 114.207], name: "temp" }];

export const Main = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userLocation, setUserLocation] = useState();
  const [viewLocation, setViewLocation] = useState({
    center: [22.42, 114.207],
    zoom: 13
  });
  const [markerData, setMarkerData] = useState([]);

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
              const index = markerData.findIndex(
                o => o.loc === tmp.loc && o.name === tmp.loc
              );
              if (index === -1) {
                markerTemp.push(tmp);
              }
            });
            setMarkerData(markerTemp);
            console.log("[Main.js] markerData is", markerData);
          })
      );
    }

    return () => {
      for (const unsubscribe of listeners) {
        console.log("[Main.js] unsubscribing");
        unsubscribe();
      }
    };
  }, [markerData, viewLocation]);

  return (
    <div className="Main">
      <header className="Main-header">
        <MapContainer
          userLocation={viewLocation}
          onViewportChanged={viewport => setViewLocation(viewport)}
          onMapClick={latlng => console.log("[Main.js] Map clicked", latlng)}
          markerData={devMarkerData.concat(markerData)}
        />
        <button onClick={() => auth().signOut()}>sign out</button>
      </header>
    </div>
  );
};
