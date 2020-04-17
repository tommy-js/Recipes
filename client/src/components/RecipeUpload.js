import React, { useState } from "react";
import "../app.scss";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { addRecipeMutation } from "../queries/queries";

function RecipeUpload(props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  function submitForm(e) {
    e.preventDefault();
    props.addRecipeMutation({
      variables: {
        name: title,
        id: Math.floor(Math.random() * 10000000),
        content: text
      }
    });
  }

  function submitImage(e) {
    e.preventDefault();
  }

  return (
    <div>
      <form className="upload_form">
        <div className="image_upload_form" onClick={submitImage}>
          +
        </div>
        <input
          className="upload_form_title"
          type="text"
          onChange={e => setTitle(e.target.value)}
          placeholder="Recipe name..."
        />
        <textarea
          className="upload_form_content"
          placeholder="Instructions"
          onChange={e => setText(e.target.value)}
        />
        <div className="recipe_upload_button_block">
          <button className="recipe_upload_button" onClick={submitForm}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default compose(
  graphql(addRecipeMutation, { name: "addRecipeMutation" })
)(RecipeUpload);
