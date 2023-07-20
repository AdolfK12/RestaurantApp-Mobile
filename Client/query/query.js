import { gql } from "@apollo/client";

export const GET_ITEMS = gql`
  query Query {
    items {
      id
      name
      description
      price
      imgUrl
      Category
    }
  }
`;

export const GET_ITEM_BY_ID = gql`
  query GetItemByIdQuery($itemId: ID!) {
    getItemById(itemId: $itemId) {
      id
      name
      description
      price
      imgUrl
      Category
    }
  }
`;
