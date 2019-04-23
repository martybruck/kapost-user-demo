import React from "react";
import logo from "./logo.svg";
import "./App.css";

import UserTable from "./UserTable";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
        <UserTable />
      </div>
    </div>
  );
}

export default App;
