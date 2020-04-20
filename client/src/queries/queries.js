import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const addUserMutation = gql`
  mutation($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      username
      password
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
  mutation($name: String!, $id: ID!, $content: String!, $type: String!) {
    addRecipe(name: $name, id: $id, content: $content, type: $type) {
      name
      id
      content
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
