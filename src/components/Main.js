import React, { useState, useEffect } from "react";
import { auth } from "firebase";
import "./Main.css";
import { MapContainer } from "./MapContainer";

export const Main = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    setUserInfo(auth().currentUser);
    console.log("[Main.js] current user is", auth().currentUser);
  }, []);

  return (
    <div className="Main">
      <header className="Main-header">
        <p>
          yay<code> {userInfo ? userInfo.uid : null}</code>
        </p>
        <MapContainer
          handleClick={() => console.log("[Main.js] Map clicked")}
        />
        <button onClick={() => auth().signOut()}>sign out</button>
      </header>
    </div>
  );
};
