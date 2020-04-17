import React from "react";
import "../app.scss";

function RecipeComponent(props) {
  return (
    <div className="recipe_component">
      <div className="recipe_image_container">
        <img
          className="recipe_image"
          src="https://images.pexels.com/photos/947173/pexels-photo-947173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        />
      </div>
      <h2 className="recipe_header">{props.name}</h2>
      <p className="recipe_content">{props.content}</p>
    </div>
  );
}

export default RecipeComponent;
