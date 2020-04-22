import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const addUserMutation = gql`
  mutation($username: String!, $password: String!, $salt: String!) {
    addUser(username: $username, password: $password, salt: $salt) {
      username
      password
      salt
    }
  }
`;

const getUserQuery = gql`
  query($username: String!) {
    user(username: $username) {
      username
      password
    }
  }
`;

const getUsers = gql`
  {
    users {
      username
      password
    }
  }
`;

const getRecipeQuery = gql`
  query($id: ID!) {
    recipe(id: $id) {
      id
      name
      content
      ingredients
      user
      type
    }
  }
`;

const getRecipes = gql`
  {
    recipes {
      id
      name
      content
      ingredients
      user
      type
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

const addRecipeMutation = gql`
  mutation(
    $name: String!
    $id: ID!
    $content: String!
    $type: String!
    $user: String!
    $ingredients: String!
  ) {
    addRecipe(
      name: $name
      id: $id
      content: $content
      type: $type
      user: $user
      ingredients: $ingredients
    ) {
      name
      id
      content
      ingredients
      user
      type
    }
  }
`;

export {
  addUserMutation,
  getUserQuery,
  getUsers,
  getItemQuery,
  getItems,
  addItem,
  getRecipes,
  getRecipeQuery,
  addRecipeMutation
};
