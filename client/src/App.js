import React, { useState } from "react";
import MainBody from "./components/MainBody";
import About from "./components/About";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import RecipeComponent from "./components/RecipeComponent";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import "./app.scss";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

function App() {
  const [recipes, setRecipes] = useState([]);

  function modedRecipes(passedRecipes) {
    setRecipes(passedRecipes);
  }

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/">
            <MainBody modedRecipes={modedRecipes} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          {recipes.map(recipeArray => (
            <Route path={"/" + recipeArray.id}>
              <RecipeComponent
                name={recipeArray.name}
                content={recipeArray.content}
              />
            </Route>
          ))}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
