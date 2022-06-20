import { gql } from "@apollo/client";

export const ALL_FILES = gql`
  query {
    users {
      _id
      file
    }
  }
`;

export const ALL_SLIDERS = gql`
  query {
    sliders {
      _id
      images
    }
  }
`;
