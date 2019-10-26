import React, { useState, useEffect } from "react";
import { auth, firestore } from "firebase";

export const Dev = () => {
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
      <hr />
      <button
        onClick={() => {
          let f = firestore().collection("testMarkers");
          for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
              f.add({
                name: "this is a marker",
                loc: [22.37 + i * 0.01, 114.202 + j * 0.001]
              });
            }
          }
        }}
      >
        test
      </button>
    </div>
  );
};
