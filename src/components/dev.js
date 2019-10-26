import React, { useState, useEffect } from "react";
import firebase, { auth } from "firebase";

export const Dev = () => {
  const [longitude, setlongitude] = useState(0);
  const [latitude, setlatitude] = useState(0);
  const db = firebase.firestore();
  const [list, setlist] = useState([]);
  const [catsub, setCatsub] = useState("");
  const [cat, setCat] = useState("");
  const [name, setName] = useState("");

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
            setlatitude(e.target.value);
          }}
        />
        <label>Longitude</label>
        <input
          type="text"
          name="longitude"
          value={longitude}
          onChange={e => {
            setlongitude(e.target.value);
          }}
        />
        <label>name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
        ></input>
      </form>

      <br></br>
      <label>type</label>
      <select
        value={cat}
        onChange={e => {
          setCat(e.target.value);
        }}
      >
        <option value="Discount">Discount</option>
        <option value="Event">Event</option>
        <option value="Incident">Incident</option>
      </select>
      <label>subtype</label>
      <select
        value={catsub}
        onChange={e => {
          setCatsub(e.target.value);
        }}
      >
        <option value="Foods and Beverages">Foods and Beverages</option>
        <option value="Stores">Stores</option>
        <option value="Attractions">Attractions</option>
        <option value="Hotels">Hotels</option>
        <option value="Markets">Markets</option>
        <option value="Music">Music</option>
        <option value="Parade">Parade</option>
        <option value="Sports">Sports</option>
        <option value="Traffic">Traffic</option>
        <option value="Gathering">Gathering</option>
        <option value="Fire">Fire</option>
        <option value="Gas Leakage">Gas Leakage</option>
        <option value="Air Quality">Air Quality</option>
      </select>
      <button
        onClick={() => {
          var longIndex = parseFloat(longitude).toFixed(1);
          var latiIndex = parseFloat(latitude).toFixed(1);
          var Index = latiIndex + "+" + longIndex;
          db.collection("test")
            .doc("test")
            .collection(Index)
            .add({
              loc: [latitude, longitude],
              name: name,
              category: cat,
              subtype: catsub,
              time: new Date().toUTCString()
            });
          alert("uploaded " + Index);
        }}
      >
        submit
      </button>
      <button
        onClick={() => {
          var longIndex = parseFloat(longitude).toFixed(1);
          var latiIndex = parseFloat(latitude).toFixed(1);
          var Index = latiIndex + "+" + longIndex;
          var ref = db
            .collection("test")
            .doc("test")
            .collection(Index);
          ref.get().then(snap => {
            const array = [];
            snap.forEach(doc => {
              array.push(doc.data());
            });
            setlist(list => array);
          });
          console.log(list);
        }}
      >
        get
      </button>
      <h1>
        latitude:{latitude}
        <br></br>
        longitude:{longitude}
        <br></br>
        type:{cat}
        <br></br>
        sub:{catsub}
      </h1>
    </div>
  );
};
