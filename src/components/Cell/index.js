import React from "react";
import "./index.css";

export default ({ position }) => (
  <div class="cell">{position.y * 10 + position.x + 1}</div>
);
