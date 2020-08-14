import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Routes from "./Final/Routes"

function App() {
  return (
    <div>
      <Router>
        <Routes/>
      </Router>
    </div>
  );
}

export default App;
