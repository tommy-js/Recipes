import React, { useState, createContext } from "react";
import MainBody from "./components/MainBody";
import About from "./components/About";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import RecipeUpload from "./components/RecipeUpload";
import RecipeComponent from "./components/RecipeComponent";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import "./app.scss";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

export const UserContext = createContext(null);
export const IndividualContext = createContext(null);

function App() {
  const [recipes, setRecipes] = useState([]);
  const [signinState, setSigninState] = useState(false);
  const [userData, setUserData] = useState("");

  function modedRecipes(passedRecipes) {
    setRecipes(passedRecipes);
  }

  function checkSignin() {
    if (signinState) {
      return (
        <div>
          <Route exact path="/upload">
            <RecipeUpload />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={{ signinState, setSigninState }}>
        <IndividualContext.Provider value={{ userData, setUserData }}>
          <Router>
            <div className="App">
              <Navbar />
              <Route exact path="/">
                <MainBody modedRecipes={modedRecipes} />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              {checkSignin()}
              {recipes.map(recipeArray => (
                <Route path={"/" + recipeArray.id}>
                  <RecipeComponent
                    name={recipeArray.name}
                    content={recipeArray.content}
                  />
                </Route>
              ))}
              <Route exact path="/Signin">
                {signinState ? <Redirect to="/" /> : <LoginPage />}
              </Route>
            </div>
          </Router>
        </IndividualContext.Provider>
      </UserContext.Provider>
    </ApolloProvider>
  );
}

export default App;
