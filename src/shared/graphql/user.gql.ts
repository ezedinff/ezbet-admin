import gql from "graphql-tag";

export const CURRENT_USER = gql`
{
	whoami{
    _id
    firstName
    lastName
    username
    isVerified
    isActive
    isLocked
    role
    details{
      accountBalance
      profileImage
    }
  }
}
`;

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