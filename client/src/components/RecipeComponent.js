import React, { useState, useContext } from "react";
import "../app.scss";
import like from "../icons/like.png";
import like_filled from "../icons/like_filled.png";
import share from "../icons/share.png";
import share_filled from "../icons/share_filled.png";
import { UserContext } from "../App";

function RecipeComponent(props) {
  const [likeSelected, setLikeSelected] = useState(35);
  const [shareSelected, setShareSelected] = useState(35);
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);

  const { signinState, setSigninState } = useContext(UserContext);

  function highlightLike() {
    if (!liked) {
      setLikeSelected(0);
    } else {
      setLikeSelected(35);
    }
    setLiked(!liked);
  }

  function highlightShare() {
    if (!shared) {
      setShareSelected(0);
    } else {
      setShareSelected(35);
    }
    setShared(!shared);
  }

  function mouseoverLike() {
    if (!liked) {
      setLikeSelected(0);
    }
  }

  function mouseoutLike() {
    if (!liked) {
      setLikeSelected(35);
    }
  }

  function mouseoverShare() {
    if (!shared) {
      setShareSelected(0);
    }
  }

  function mouseoutShare() {
    if (!shared) {
      setShareSelected(35);
    }
  }

  function setRecipeBar() {
    if (signinState) {
      return (
        <div className="recipe_interaction_bar">
          <div
            className="button_item"
            onMouseOver={mouseoverLike}
            onMouseOut={mouseoutLike}
            onClick={highlightLike}
          >
            <img className="like_button" src={like} />
            <div
              className="background_white"
              style={{ height: likeSelected + "px" }}
            ></div>
            <img className="like_button" src={like_filled} />
          </div>
          <div
            className="button_item"
            onMouseOver={mouseoverShare}
            onMouseOut={mouseoutShare}
            onClick={highlightShare}
          >
            <img className="share_button" src={share} />
            <div
              className="background_white"
              style={{ height: shareSelected + "px" }}
            ></div>
            <img className="share_button" src={share_filled} />
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <div className="recipe_component">
      <div className="recipe_image_container">
        <img
          className="recipe_image"
          src="https://images.pexels.com/photos/947173/pexels-photo-947173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        />
      </div>
      <h2 className="recipe_header">{props.name}</h2>
      {setRecipeBar()}
      <h3 className="recipe_header">Directions</h3>
      <div className="recipe_ingredients">
        <h3 className="recipe_ingredient_header">Ingredients</h3>
        <h4>shrimp</h4>
      </div>
      <p className="recipe_content">{props.content}</p>
    </div>
  );
}

export default RecipeComponent;
