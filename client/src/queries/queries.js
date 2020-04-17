import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getItemsQuery = gql`
  {
    items {
      id
      name
    }
  }
`;

export { getItemsQuery };
