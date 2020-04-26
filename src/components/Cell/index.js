import React from "react";
import "./index.css";

export default ({ position, number, isActive, onClick }) => (
  <div onClick={onClick} className={`cell ${isActive ? "active" : null}`}>
    {number}
  </div>
);
