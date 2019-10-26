import React, { useState, useEffect } from "react";
import { auth, firestore } from "firebase";
import "./Main.css";
import { MapContainer } from "./MapContainer";
import { AddForm } from "./AddForm";

//Newly added TABS
import { Tab } from "./Tab";

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
  const [AddFormDisplay, setAddFormDisplay] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState("Discount");

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
    // setMarkerData([]);
    const listeners = [];
    var duplicated = false;
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
              for (const i of markerTemp) {
                if (i.loc[0] == tmp.loc[0] && i.loc[1] == tmp.loc[1]) {
                  duplicated = true;
                  console.log("duplicated");
                }
              }
              if (!duplicated) {
                markerTemp.push(tmp);
                console.log("push");
              }
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
  });

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

        <Tab
          markerData={markerData}
          setFilteredCategory={setFilteredCategory}
        />

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
