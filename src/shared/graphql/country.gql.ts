import gql from "graphql-tag";

export const COUNTRIES = gql`
    query{
      countries{
        _id
        name
        order
        isAvailable
      }
    }
`;