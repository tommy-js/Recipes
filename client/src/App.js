import React from "react";
import MainBody from "./components/MainBody";
import About from "./components/About";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import "./app.scss";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default App;
