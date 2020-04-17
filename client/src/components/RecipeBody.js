import React, { useState } from "react";
import RecipeComponent from "./RecipeComponent";
import "../app.scss";
import { graphql, Query } from "react-apollo";
import { gql } from "apollo-boost";
import { getRecipes } from "../queries/queries";
import { flowRight as compose } from "lodash";

function RecipeBody(props) {
  const [recipe, setRecipe] = useState([]);
  const [loaded, setLoaded] = useState(false);

  console.log(recipe);

  if (loaded) {
    return (
      <div>
        <div className="information_area">
          <div>
            {recipe.map(el => (
              <RecipeComponent name={el.name} content={el.content} />
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
