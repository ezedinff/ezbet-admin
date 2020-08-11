/*
 * GQL
 * A JavaScript template literal tag that parses GraphQL query strings into the standard GraphQL AST.
 *
 */

import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
      login(loginInput: {username: $username, password: $password}) {
        accessToken
        tokenType
        tokenType
      }
  }
`;