import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App.js";
import "../app.scss";

function Navbar() {
  const currentSigninState = useContext(UserContext);
  let appliedSigninState;
  if (currentSigninState) {
    appliedSigninState = "Log out";
  } else {
    appliedSigninState = "Log in";
  }
  return (
    <div class="navbar_block">
      <Link className="navbar_link" to="/">
        Home
      </Link>
      <Link className="navbar_link" to="/profile">
        Profile
      </Link>
      <Link className="navbar_link" to="/about">
        About
      </Link>
      <Link className="navbar_link" to="/Signin">
        {appliedSigninState}
      </Link>
    </div>
  );
}

export default Navbar;
