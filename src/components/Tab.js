import React, { useState } from "react";
import "./Tab.css";

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

// const devMarkerData = [
//   { loc: [22.50469, 114.21077], name: "Discount stuff", category: "Discount" },
//   {
//     loc: [22.50269, 114.19077],
//     name: "Discount stuff 2",
//     category: "Discount"
//   },
//   { loc: [22.50369, 114.22077], name: "Event stuff", category: "Event" },
//   { loc: [22.50069, 114.20077], name: "Event stuff 2", category: "Event" },
//   { loc: [22.50869, 114.20077], name: "Incedent stuff", category: "Incident" }
// ];

export const Tab = ({ markerData, setFilteredCategory }) => {
  const [activeTab, setActiveTab] = useState(catSub[0].name);

  const handleListClick = e => {
    setActiveTab(e.target.value);
    setFilteredCategory(e.target.value);
  };

  return (
    <div className="tabs-container">
      <ul className="tab-list">
        {catSub.map(c => (
          <li
            key={c.name}
            className={
              activeTab === c.name
                ? "tab-list-item tab-list-active"
                : "tab-list-item"
            }
          >
            <button value={c.name} onClick={handleListClick}>
              {c.name}
            </button>
          </li>
        ))}
      </ul>

      <ul className="tab-content">
        {markerData
          .filter(m => m.category === activeTab)
          .map(marker => (
            <li key={marker.name}>
              <h4>[{marker.subtype}]</h4>
              <p>
                {new Date(marker.time).getMonth()}/
                {new Date(marker.time).getDate()}: {marker.name}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};
