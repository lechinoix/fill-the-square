import React from "react";
import "./App.css";
import Grid from "./components/Grid";

function App() {
  return (
    <section className="main-section">
      <h1>Fill the square with numbers!</h1>
      <div className="grid-container">
        <Grid></Grid>
      </div>
    </section>
  );
}

export default App;
