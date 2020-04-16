import React from "react";
import MainBody from "./components/MainBody";
import About from "./components/About";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/">
          <MainBody />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </div>
    </Router>
  );
}

export default App;
