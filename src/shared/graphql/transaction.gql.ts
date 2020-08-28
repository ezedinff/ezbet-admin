import gql from "graphql-tag";

export const TRANSACTIONS = gql`
query GetTransactions(
    $customerUsername: String,
    $cashierUsername: String,
    $type: TransactionType,
    $from: String,
    $to: String
    ){
        transactions(
            customerUsername:$customerUsername,
            cashierUsername: $cashierUsername,
            type: $type,
            from: $from,
            to: $to
        ) {
            _id
            type
            amount
            shop{
              _id
              branchName
            }
            customer{
              _id
              firstName
              lastName
            }
            cashier{
              _id
              firstName
              lastName
            }
        }
    }
`;