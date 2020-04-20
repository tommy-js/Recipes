import React, { useState } from "react";
import "../app.scss";
import { graphql, Query } from "react-apollo";
import { gql } from "apollo-boost";
import { getRecipes } from "../queries/queries";
import { flowRight as compose } from "lodash";
import { addUserMutation, getUserQuery } from "../queries/queries";

function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function signUp(e) {
    e.preventDefault();
    props.getUserQuery({
      variables: {
        username: username
      }
    });
    // if (testedVal  === null)
    // props.addUserMutation({
    //   variables: {
    //     username: username,
    //     password: password
    //   }
    // });
  }

  function logIn() {}

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
      <form>
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
      </form>
    </div>
  );
}

export default compose(
  graphql(getUserQuery, { name: "getUserQuery" }),
  graphql(addUserMutation, { name: "addUserMutation" })
)(LoginPage);
