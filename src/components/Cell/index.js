import React from "react";
import "./index.css";

export default ({ number, isActive, isSelectable, onClick }) => (
  <div
    onClick={onClick}
    className={`cell ${isActive ? "active" : null} ${
      isSelectable ? "selectable" : null
    }`}
  >
    {number}
  </div>
);
