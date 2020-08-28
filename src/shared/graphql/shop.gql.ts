import gql from "graphql-tag";

export const SHOPS = gql`
{
    shops{
      _id
      branchName
      isActive
      admin{
        _id
        firstName
        lastName
        username
      }
      contacts{
        type
        value
      }
      location{
        lat
        lon
      }
    }
}
`;

export const CREATE_SHOP =  gql`
mutation CreateShop($shopInput: ShopDto!){
    createShop(shopInput: $shopInput){
        _id
        branchName
        isActive
        admin{
          _id
          firstName
          lastName
          username
        }
        contacts{
          type
          value
        }
        location{
          lat
          lon
        }
    }
  }
`;