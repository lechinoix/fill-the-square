import React from "react";
import Cell from "../Cell";
import "./index.css";

export default ({ index }) => (
  <div class="line-wrapper">
    {[...Array(10).keys()].map((_, i) => (
      <Cell position={{ x: i, y: index }} />
    ))}
  </div>
);
