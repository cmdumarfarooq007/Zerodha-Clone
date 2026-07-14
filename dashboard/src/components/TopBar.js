import React from "react";

import Menu from "./Menu";

const indices = [
  {
    name: "NIFTY 50",
    value: "22,147.00",
    change: "+127.60",
    percent: "+0.58%",
    isUp: true,
  },
  {
    name: "SENSEX",
    value: "72,996.31",
    change: "+405.25",
    percent: "+0.56%",
    isUp: true,
  },
];

const TopBar = ({ onLogout, user }) => {
  return (
    <div className="topbar-container">
      <div className="indices-container">
        {indices.map((idx, i) => (
          <div className={idx.name === "NIFTY 50" ? "nifty" : "sensex"} key={i}>
            <p className="index">{idx.name}</p>
            <p className={`index-points ${idx.isUp ? "up" : "down"}`}>
              {idx.value}
            </p>
            <p className={`percent ${idx.isUp ? "up" : "down"}`}>
              {idx.change} {idx.percent}
            </p>
          </div>
        ))}
      </div>

      <Menu onLogout={onLogout} user={user} />
    </div>
  );
};

export default TopBar;
