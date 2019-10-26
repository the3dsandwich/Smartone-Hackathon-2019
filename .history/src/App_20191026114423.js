// always import React from "react" to declare that this is react stuff
import React, { useState, useEffect } from "react";
// importing firebase only for firebase.initializeApp()
// importing other modules using curly brackets {}
import firebase, { auth } from "firebase";
// imports config for firebase
import { config } from "./firebase/firebase-config";
// separating css for every component
import "./App.css";
// import sub-components
import { Main } from "./components/Main";
import { Dev } from "./components/dev";

export const App = () => {
  const [appLoading, setAppLoading] = useState(true);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [test, testplus] = useState(0);

  // dev component toggle
  const [openDevComponent, setOpenDevComponent] = useState(false);

  // this block runs when this component (<App/>) mounts
  // sets up firebase and listener for authentication
  useEffect(() => {
    // initialize app with firebase.initializeApp()
    firebase.initializeApp(config);
    // set app loading state to false
    setAppLoading(false);

    // returns listener for authentication state change.
    // returning listener in useEffect unmounts this listener
    // when this component (<App/>) unmounts
    return auth().onAuthStateChanged(user => {
      if (user) {
        // user is logged in
        setIsLoggedin(true);
      } else {
        // user is signed out
        setIsLoggedin(false);
      }
    });
  }, []);

  // this block runs when this component (<App/>) mounts
  // pressing "d" toggles development component
  useEffect(() => {
    const handleD = e => {
      if (e.key === "d") {
        setOpenDevComponent(!openDevComponent);
      }
    };
    // adds event listener for pressing "d"
    window.addEventListener("keydown", handleD);
    // removes event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleD);
    };
  });

  // this block runs when isLoggedin changes
  // logs isLoggedin to console
  useEffect(() => {
    console.log("[App.js] isLoggedin changed to", isLoggedin);
  }, [isLoggedin]);

  useEffect(() => {
    console.log("click ", test);
  });

  // display rendering logic
  if (appLoading) {
    // app is loading
    return (
      <div className="App">
        <header className="App-header">
          <p>Loading...</p>
        </header>
      </div>
    );
  } else if (openDevComponent) {
    // dev component opens with "d" press
    return <Dev />;
  } else if (isLoggedin) {
    // user is logged in
    return <Main />;
  } else {
    // user is signed out
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Welcome <code>anonymous-dude</code>!
          </p>
          <button onClick={() => auth().signInAnonymously()}>login</button>
          <button onClick={() => testplus(test => test + 1)}>add</button>
          {test} times
        </header>
      </div>
    );
  }
};
