import React, { useState, useContext, useEffect } from "react";
import "../app.scss";
import { graphql, Query } from "react-apollo";
import { gql } from "apollo-boost";
import { flowRight as compose } from "lodash";
import { addUserMutation, getUsers } from "../queries/queries";
import { UserContext, IndividualContext } from "../App";
const bcrypt = require("bcryptjs");

function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);
  const [loginState, setLoginState] = useState(false);
  const [signUpState, setSignUpState] = useState(false);

  const { signinState, setSigninState } = useContext(UserContext);
  const { userData, setUserData } = useContext(IndividualContext);

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
      setUserData({ name: username });
      setSigninState(true);
      if (signUpState) {
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
        setUserData(username);
        if (loginState) {
          localStorage.setItem("USERNAME", username);
          localStorage.setItem("PASSWORD", password);
        }
      } else {
        console.log("incorrect");
      }
    }
  }

  return (
    <div className="login_page">
      <h2 className="sign_in_block">Sign up</h2>
      <form onSubmit={signUp}>
        <input
          type="text"
          placeholder="username"
          className="input_button_block"
          onChange={e => setUsername(e.target.value)}
        />
        <br />
        <input
          type="text"
          maxLength="60"
          placeholder="password"
          className="input_button_block"
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <div className="save_signin">
          <label>Save signin</label>
          <input
            type="checkbox"
            className="input_checkbox_block"
            checked={signUpState}
            onChange={() => setSignUpState(!signUpState)}
          />
        </div>
        <button className="signin_button">Sign up</button>
      </form>
      <h2 className="sign_in_block">Log in</h2>
      <form onSubmit={logIn}>
        <input
          type="text"
          className="input_button_block"
          placeholder="username"
          onChange={e => setUsername(e.target.value)}
        />
        <br />
        <input
          type="text"
          maxLength="60"
          className="input_button_block"
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <div className="save_signin">
          <label>Save signin</label>
          <input
            type="checkbox"
            className="input_checkbox_block"
            checked={loginState}
            onChange={() => setLoginState(!loginState)}
          />
        </div>
        <button className="signin_button">Sign in</button>
      </form>
      <Query query={getUsers}>
        {({ loading, data }) => {
          if (loading) {
            return null;
          } else {
            const { users } = data;
            setUserList(users);
            return null;
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
