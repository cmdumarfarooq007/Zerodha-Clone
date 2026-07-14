import React from "react";

const Toast = ({ message, type }) => {
  const bgColor = type === "success" ? "#4caf50" : type === "error" ? "#f44336" : "#2196f3";

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        background: bgColor,
        color: "#fff",
        padding: "12px 24px",
        borderRadius: "6px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        zIndex: 9999,
        fontSize: "0.9rem",
        fontWeight: 400,
        animation: "slideUp 0.3s ease",
      }}
    >
      {message}
    </div>
  );
};

export default Toast;
