import React, { useState, useEffect } from "react";
import { auth } from "firebase";

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
      <br />
      <form>
        <label>Latitude</label>
        <input type="text" name="firstName" required />
        <label>Lontitude</label>
        <input type="text" name="lastName" required />
      </form>
    </div>
  );
};
