import React from "react";
import "../app.scss";

function RecipeBody() {
  let loaded = false;

  if (loaded) {
    return (
      <div>
        <div className="information_area">
          <h1>Your recipe</h1>
          <p>Hi tyhere</p>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="information_area">
          <h1 className="information_area_unloaded_inner">
            Nothing here yet...
          </h1>
        </div>
      </div>
    );
  }
}

export default RecipeBody;
