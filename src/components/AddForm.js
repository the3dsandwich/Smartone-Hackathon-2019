import React, { useState } from "react";
import firebase, { functions } from "firebase";

const catSub = [
  {
    name: "Discount",
    subtype: ["Foods and Beverages", "Stores", "Attractions", "Hotels"]
  },
  { name: "Event", subtype: ["Markets", "Music", "Parade", "Sports"] },
  {
    name: "Incident",
    subtype: ["Traffic", "Gathering", "Fire", "Gas Leakage", "Air Quality"]
  }
];

export const AddForm = ({ setAddFormDisplay }) => {
  const db = firebase.firestore();
  const [formState, setFormState] = useState("select-category");
  const [categorySelection, setCategorySelection] = useState("Discount");
  const [subtypeSelection, setSubtypeSelection] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  const handleSwitchState1 = e => {
    e.preventDefault();
    setSubtypeSelection(
      catSub.filter(i => i.name === categorySelection)[0].subtype[0]
    );
    setFormState("select-subtype");
  };

  const handleSwitchState2 = e => {
    e.preventDefault();
    setFormState("enter-description");
  };

  const handleSwitchState3 = e => {
    e.preventDefault();
    setFormState("submit");
  };

  const addFormResponse = e => {
    e.preventDefault();
    let loc = [22.42, 114.207];
    navigator.geolocation.getCurrentPosition(
      pos => (loc = [pos.coords.latitude, pos.coords.longitude])
    );
    const parseSending = {
      loc: loc,
      name: descriptionInput,
      time: new Date().toUTCString(),
      category: categorySelection,
      subtype: subtypeSelection
    };
    console.log("[AddForm.js] received instruction", parseSending);

    // const addMarker = functions().httpsCallable("addMarker");
    // addMarker(parseSending)
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
    var longIndex = parseFloat(loc[1]).toFixed(1);
    var latiIndex = parseFloat(loc[0]).toFixed(1);
    var Index = latiIndex + "+" + longIndex;
    db.collection("test")
      .doc("test")
      .collection(Index)
      .add(parseSending);
    alert("uploaded " + Index);

    setAddFormDisplay(false);
  };

  switch (formState) {
    case "select-category":
      return (
        <div className="firstPop">
          <form onSubmit={handleSwitchState1}>
            <label>
              select category
              <select
                value={categorySelection}
                onChange={e => setCategorySelection(e.target.value)}
              >
                {catSub.map(cat => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">Next!</button>
          </form>
        </div>
      );
    case "select-subtype":
      return (
        <form onSubmit={handleSwitchState2}>
          <label>
            select {categorySelection} type
            <select
              value={subtypeSelection}
              onChange={e => setSubtypeSelection(e.target.value)}
            >
              {catSub
                .filter(i => i.name === categorySelection)[0]
                .subtype.map(s => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
            </select>
          </label>
          <button type="submit">Next!</button>
        </form>
      );
    case "enter-description":
      return (
        <form onSubmit={handleSwitchState3}>
          <label>
            The description:
            <input
              type="text"
              value={descriptionInput}
              name="description"
              onChange={e => setDescriptionInput(e.target.value)}
            ></input>
          </label>
          <button type="submit">Next!</button>
        </form>
      );
    case "submit":
      return (
        <form onSubmit={addFormResponse}>
          <button type="submit">Submit!</button>
        </form>
      );
    default:
      return null;
  }
};
