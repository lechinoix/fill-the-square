import React from "react";
import Line from "../Line";
import "./index.css";

export default (props) => (
  <div class="grid-line-wrapper">
    {[...Array(10).keys()].map((_, i) => (
      <Line index={i} />
    ))}
  </div>
);
