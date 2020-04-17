import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getRecipeQuery = gql`
  query($id: ID!) {
    recipe(id: $id) {
      id
      name
      content
    }
  }
`;

const getRecipes = gql`
  {
    recipes {
      id
      name
      content
    }
  }
`;

const getItemQuery = gql`
  query($id: ID!) {
    item(id: $id) {
      id
      name
    }
  }
`;

const getItems = gql`
  {
    items {
      id
      name
    }
  }
`;

const addItem = gql`
  mutation($name: String!, $id: ID!) {
    addItem(name: $name, id: $id) {
      name
      id
    }
  }
`;

const addRecipe = gql`
  mutation($name: String!, $id: ID!, $content: String!) {
    addRecipe(name: $name, id: $id, content: $content) {
      name
      id
      content
    }
  }
`;

export {
  getItemQuery,
  getItems,
  addItem,
  getRecipes,
  getRecipeQuery,
  addRecipe
};
