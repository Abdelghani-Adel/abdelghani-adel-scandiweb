import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query {
    category {
      name
    }
  }
`;
