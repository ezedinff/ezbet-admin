import gql from "graphql-tag";

// export const CURRENT_USER = gql`
//     {
        
//     }
// `;

export const USERS = gql`
{
    users{
      _id
      firstName
      lastName
      username
      isVerified
      isActive
      role
      details{
        accountBalance
      }
    }
}
`;