import React from "react";
import { Link } from "react-router-dom";
import History from "./History";

function Profile() {
  return (
    <div>
      <p>Your Profile</p>
      <div>
        <Link to="/upload">Upload recipe</Link>
        <History />
      </div>
    </div>
  );
}

export default Profile;
