import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", path: "/", index: 0 },
  { label: "Orders", path: "/orders", index: 1 },
  { label: "Holdings", path: "/holdings", index: 2 },
  { label: "Positions", path: "/positions", index: 3 },
  { label: "Funds", path: "/funds", index: 4 },
  { label: "Apps", path: "/apps", index: 5 },
];

const Menu = ({ onLogout, user }) => {
  const location = useLocation();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const initials = user ? user.charAt(0).toUpperCase() : "U";

  const getActiveIndex = () => {
    const item = menuItems.find((m) => m.path === location.pathname);
    return item ? item.index : 0;
  };

  const activeIndex = getActiveIndex();

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} alt="logo" />
      <div className="menus">
        <ul>
          {menuItems.map((item) => (
            <li key={item.index}>
              <Link
                style={{ textDecoration: "none" }}
                to={item.path}
              >
                <p
                  className={
                    activeIndex === item.index ? "menu selected" : "menu"
                  }
                >
                  {item.label}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <hr />
        <div
          className="profile"
          onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
        >
          <div className="avatar">{initials}</div>
          <p className="username">{user?.split("@")[0]}</p>
        </div>
        {isProfileDropdownOpen && (
          <div className="profile-dropdown">
            <p className="profile-email" onClick={() => setIsProfileDropdownOpen(false)}>
              {user}
            </p>
            <hr style={{ margin: "4px 0", border: "none", borderTop: "1px solid #eee" }} />
            <p
              className="profile-logout"
              onClick={(e) => {
                e.stopPropagation();
                onLogout();
              }}
            >
              Logout
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
