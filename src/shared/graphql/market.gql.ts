import gql from "graphql-tag";

export const MARKETS = gql`
  {
    markets{
      _id
      id
      name
      isAvailable
    }
  }
`;

export const UPDATE_MARKETS = gql`
mutation UpdateMarket($id: String!, $updateInput: MarketDTO!){
    updateMarket(id: $id, updateInput: $updateInput) {
        _id
        id
        name
        isAvailable
    }
}
`;