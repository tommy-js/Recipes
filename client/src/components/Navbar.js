import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App.js";
import "../app.scss";

function Navbar() {
  const { signinState, setSigninState } = useContext(UserContext);

  function logOut() {
    setSigninState(false);
    if (localStorage.getItem("USERNAME") && localStorage.getItem("PASSWORD")) {
      localStorage.removeItem("USERNAME");
      localStorage.removeItem("PASSWORD");
    }
  }

  function changeState() {
    if (signinState) {
      return (
        <div style={{ display: "inline-block" }}>
          <div onClick={logOut} className="navbar_link">
            Log out
          </div>
          <Link className="navbar_link" to="/profile">
            Profile
          </Link>
        </div>
      );
    } else {
      return (
        <Link className="navbar_link" to="/Signin">
          Log in
        </Link>
      );
    }
  }

  return (
    <div class="navbar_block">
      <Link className="navbar_link" to="/">
        Home
      </Link>
      {changeState()}
      <Link className="navbar_link" to="/about">
        About
      </Link>
    </div>
  );
}

export default Navbar;
