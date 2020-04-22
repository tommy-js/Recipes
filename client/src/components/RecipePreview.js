import React from "react";

function RecipePreview(props) {
  return (
    <div className="recipe_preview">
      <div className="recipe_image_container">
        <img
          className="recipe_image"
          src="https://images.pexels.com/photos/947173/pexels-photo-947173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        />
      </div>
      <h2 className="recipe_header">{props.name}</h2>
      <h3 className="recipe_header">{props.username}</h3>
    </div>
  );
}

export default RecipePreview;
