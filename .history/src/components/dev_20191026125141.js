import React, { useState, useEffect } from "react";
import { auth } from "firebase";

export const Dev = () => {
  const [longitude, setlongitude] = useState(0);
  const [latitude, setlatitude] = useState(0);
  return (
    <div>
      <p>Development</p>
      <p>authentication status = {auth().currentUser ? "true" : "false"}</p>
      <button onClick={() => auth().signInAnonymously()}>
        sign in anonymously
      </button>
      <button
        onClick={() => auth().signInWithRedirect(new auth.GoogleAuthProvider())}
      >
        sign in with Google
      </button>
      <button onClick={() => auth().signOut()}>sign out</button>
      <button
        onClick={() =>
          console.log("[dev.js] current user is", auth().currentUser)
        }
      >
        log current user
      </button>
      <form>
        <label>Latitude</label>
        <input
          type="text"
          name="latitude"
          value={latitude}
          onChange={e => {
            setlatitude(latitude => e);
          }}
        />
        <label>Longitude</label>
        <input type="text" name="longitude" />
      </form>
      <h1>
        latitude:{latitude}
        <br></br>
        longitude:{longitude}
      </h1>
    </div>
  );
};
