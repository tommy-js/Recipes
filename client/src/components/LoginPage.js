import React, { useState, useContext } from "react";
import "../app.scss";
import { graphql, Query } from "react-apollo";
import { gql } from "apollo-boost";
import { getRecipes } from "../queries/queries";
import { flowRight as compose } from "lodash";
import { addUserMutation, getUsers } from "../queries/queries";
import { UserContext } from "../App";

function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);

  const { signinState, setSigninState } = useContext(UserContext);

  function signUp(e) {
    e.preventDefault();
    let checkUser = userList.find(el => el.username === username);
    if (checkUser) {
      console.log("User already defined");
    } else {
      props.addUserMutation({
        variables: {
          username: username,
          password: password
        }
      });
      setSigninState(true);
    }
  }

  function logIn(e) {
    e.preventDefault();
    let checkUser = userList.find(el => el.username === username);
    if (checkUser) {
      let indexed = userList.indexOf(checkUser);
      if (userList[indexed].password === password) {
        console.log("signed in");
        setSigninState(true);
      } else {
        console.log("incorrect");
      }
    }
  }

  return (
    <div className="login_page">
      <h2>Sign up</h2>
      <form onSubmit={signUp}>
        <label>Username</label>
        <input
          type="text"
          placeholder="username"
          onChange={e => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="text"
          maxLength="60"
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />
        <button>Bt</button>
      </form>
      <h2>Log in</h2>
      <form onSubmit={logIn}>
        <label>Username</label>
        <input
          type="text"
          placeholder="username"
          onChange={e => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="text"
          maxLength="60"
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />
        <button>x</button>
      </form>
      <Query query={getUsers}>
        {({ loading, data }) => {
          if (loading) {
            return "Loading";
          } else {
            const { users } = data;
            setUserList(users);
            return "Loaded";
          }
        }}
      </Query>
    </div>
  );
}

export default compose(
  graphql(getUsers, { name: "getUsers" }),
  graphql(addUserMutation, { name: "addUserMutation" })
)(LoginPage);
