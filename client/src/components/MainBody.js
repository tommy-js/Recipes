import React from "react";
import RecipeBody from "./RecipeBody";
import Sidebar from "./Sidebar";

function MainBody() {
  return (
    <div>
      <Sidebar />
      <RecipeBody />
    </div>
  );
}

export default MainBody;
