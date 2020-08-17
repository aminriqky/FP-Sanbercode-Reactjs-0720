import React, { useState } from "react";
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Routes from "./Final/Routes";
import { AppContext } from "./Final/contextLib";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  return (
    <div>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
      <Router>
        <Routes/>
      </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
