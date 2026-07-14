import React from "react";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = ({ onLogout, user }) => {
  return (
    <>
      <TopBar onLogout={onLogout} user={user} />
      <Dashboard user={user} />
    </>
  );
};

export default Home;
