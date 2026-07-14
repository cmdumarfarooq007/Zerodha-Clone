import React, { useContext } from "react";
import GeneralContext from "./GeneralContext";

const apps = [
  {
    name: "Console",
    description: "Backoffice, tax reports, and portfolio analytics",
    icon: "📊",
    status: "active",
    url: "https://console.zerodha.com",
  },
  {
    name: "Coin",
    description: "Direct mutual funds with zero commissions",
    icon: "🪙",
    status: "active",
    url: "https://coin.zerodha.com",
  },
  {
    name: "Kite Connect",
    description: "Build your own trading platforms with our API",
    icon: "🔌",
    status: "active",
    url: "https://kite.zerodha.com/connect",
  },
  {
    name: "Sentinel",
    description: "Real-time price alerts delivered via email",
    icon: "🔔",
    status: "coming-soon",
    url: null,
  },
  {
    name: "Smallcase",
    description: "Thematic portfolios of stocks and ETFs",
    icon: "📁",
    status: "active",
    url: "https://smallcase.zerodha.com",
  },
  {
    name: "Streak",
    description: "Algo trading and strategy backtesting",
    icon: "🤖",
    status: "coming-soon",
    url: null,
  },
];

const Apps = () => {
  const generalContext = useContext(GeneralContext);

  const handleCardClick = (app) => {
    if (app.url) {
      window.open(app.url, "_blank", "noopener,noreferrer");
    } else {
      generalContext.showToast(`${app.name} is coming soon!`, "info");
    }
  };

  return (
    <div className="apps-container">
      <h3 className="title">Apps</h3>
      <div className="apps-grid">
        {apps.map((app, index) => (
          <div
            className="app-card"
            key={index}
            onClick={() => handleCardClick(app)}
            style={{ cursor: "pointer" }}
          >
            <div className="app-icon">{app.icon}</div>
            <h4>{app.name}</h4>
            <p>{app.description}</p>
            <p className={`app-status ${app.status}`}>
              {app.status === "active" ? "Connected" : "Coming Soon"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apps;
