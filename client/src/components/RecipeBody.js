import React, { useState, useEffect } from "react";
import RecipePreview from "./RecipePreview";
import "../app.scss";
import { graphql, Query } from "react-apollo";
import { gql } from "apollo-boost";
import { getRecipes } from "../queries/queries";
import { flowRight as compose } from "lodash";
import { Link } from "react-router-dom";

function RecipeBody(props) {
  const [recipe, setRecipe] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    props.modedRecipes(recipe);
  }, [recipe]);

  if (loaded) {
    return (
      <div>
        <div className="information_area">
          <div>
            {recipe.map(el => (
              <Link to={"/" + el.id}>
                <RecipePreview name={el.name} content={el.content} />
              </Link>
            ))}
          </div>
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
        <Query query={getRecipes}>
          {({ loading, data }) => {
            if (loading) {
              return "Loading";
            } else {
              const { recipes } = data;
              setRecipe(recipes);
              setLoaded(true);
              return null;
            }
          }}
        </Query>
      </div>
    );
  }
}

export default compose(graphql(getRecipes, { name: "getRecipes" }))(RecipeBody);
