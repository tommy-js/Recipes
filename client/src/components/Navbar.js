import React from "react";
import { Link } from "react-router-dom";
import "../app.scss";

function Navbar() {
  return (
    <div class="navbar_block">
      <Link className="navbar_link" to="/">
        Home
      </Link>
      <Link className="navbar_link" to="/about">
        About
      </Link>
      <Link className="navbar_link" to="/profile">
        Profile
      </Link>
    </div>
  );
}

export default Navbar;
