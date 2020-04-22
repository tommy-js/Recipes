import React, { useState, useContext, useEffect } from "react";
import "../app.scss";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { addRecipeMutation } from "../queries/queries";
import { IndividualContext } from "../App";
import { Link } from "react-router-dom";

function RecipeUpload(props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [type, setType] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [unsubmitted, setUnsubmitted] = useState(true);

  const { userData, setUserData } = useContext(IndividualContext);

  function submitForm(e) {
    e.preventDefault();
    props.addRecipeMutation({
      variables: {
        name: title,
        id: Math.floor(Math.random() * 10000000),
        content: text,
        type: type,
        ingredients: ingredients,
        user: userData,
        submitter: userData.name
      }
    });
    setUnsubmitted(false);
  }

  function submitImage(e) {
    e.preventDefault();
  }

  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setSelectedImage(objectUrl);
  }, [selectedFile]);

  if (unsubmitted) {
    return (
      <div>
        <form className="upload_form">
          <div className="image_upload_form">
            <img className="header_image" src={selectedImage} />
            <div className="image_upload_closure">
              <p className="header_image_recipe_upload">Add header image...</p>
              <input
                type="file"
                className="input_button"
                onChange={e => setSelectedFile(e.target.files[0])}
              />
            </div>
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
          <p>{userData}</p>
          <input type="text" onChange={e => setIngredients(e.target.value)} />
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
  } else {
    return (
      <div>
        <p>Thanks for submitting!</p>
        <Link to="/">Back home</Link>
      </div>
    );
  }
}

export default compose(
  graphql(addRecipeMutation, { name: "addRecipeMutation" })
)(RecipeUpload);
