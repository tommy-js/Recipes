import React, { useState, useContext } from "react";
import "../app.scss";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { addRecipeMutation } from "../queries/queries";
import { IndividualContext } from "../App";

function RecipeUpload(props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [type, setType] = useState("");

  const { userData, setUserData } = useContext(IndividualContext);

  function submitForm(e) {
    e.preventDefault();
    props.addRecipeMutation({
      variables: {
        name: title,
        id: Math.floor(Math.random() * 10000000),
        content: text,
        type: type,
        submitter: userData.name
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
        <div className="recipe_type_input_container">
          <input
            onChange={e => setType(e.target.value)}
            className="recipe_type_input"
            type="text"
            placeholder="Appetizer, desert, snack, lunch, etc..."
          />
        </div>
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
