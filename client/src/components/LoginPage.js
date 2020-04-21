import React, { useState, useContext, useEffect } from "react";
import "../app.scss";
import { graphql, Query } from "react-apollo";
import { gql } from "apollo-boost";
import { flowRight as compose } from "lodash";
import { addUserMutation, getUsers } from "../queries/queries";
import { UserContext } from "../App";
const bcrypt = require("bcryptjs");

function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);
  const [loginState, setLoginState] = useState(false);

  const { signinState, setSigninState } = useContext(UserContext);

  useEffect(() => {
    let useName = localStorage.getItem("USERNAME");
    let passName = localStorage.getItem("PASSWORD");
    let checkUser = userList.find(el => el.username === useName);
    if (useName && passName) {
      if (checkUser) {
        let indexed = userList.indexOf(checkUser);
        let salt = userList[indexed].salt;
        let afterPass = userList[indexed].password;
        let checkPass = bcrypt.compareSync(passName, afterPass);
        if (checkPass) setSigninState(true);
      }
    }
  });

  function signUp(e) {
    e.preventDefault();
    let checkUser = userList.find(el => el.username === username);
    if (checkUser) {
      console.log("User already defined");
    } else {
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(password, salt);
      props.addUserMutation({
        variables: {
          username: username,
          password: hash,
          salt: salt
        }
      });
      setSigninState(true);
      if (loginState) {
        localStorage.setItem("USERNAME", username);
        localStorage.setItem("PASSWORD", password);
      }
    }
  }

  function logIn(e) {
    e.preventDefault();
    let checkUser = userList.find(el => el.username === username);
    if (checkUser) {
      let indexed = userList.indexOf(checkUser);
      let salt = userList[indexed].salt;
      let afterPass = userList[indexed].password;
      let checkPass = bcrypt.compareSync(password, afterPass);
      if (checkPass) {
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
        <label>Save Login</label>
        <input
          type="checkbox"
          checked={loginState}
          onChange={() => setLoginState(!loginState)}
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
