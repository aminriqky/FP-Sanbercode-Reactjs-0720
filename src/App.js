import React, { useState, useEffect } from "react";
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Routes from "./Final/Routes";
import { AppContext } from "./Final/contextLib";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      let x = await sessionStorage.getItem("context");
      userHasAuthenticated(x);
    }
    catch(x) {
      if (x !== 'false') {
        alert('User Not Found');
      }
    }
    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating && (
    <div>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
      <Router>
        <Routes/>
      </Router>
      </AppContext.Provider>
    </div>
    )
  );
}

export default App;
