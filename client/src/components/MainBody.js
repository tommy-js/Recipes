import React from "react";
import RecipeBody from "./RecipeBody";
import Sidebar from "./Sidebar";
import Search from "./Search";
import "../app.scss";

function MainBody() {
  return (
    <div className="main_body_block">
      <div className="main_body_sidebar_container">
        <Sidebar />
      </div>
      <div className="main_body_recipe_body_container">
        <RecipeBody />
      </div>
      <div className="main_body_search_container">
        <Search />
      </div>
    </div>
  );
}

export default MainBody;
