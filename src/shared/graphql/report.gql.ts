import gql from "graphql-tag";

export const REPORT = gql`
query {
    report{
        date
        noPlayed
        playedMoney
        noWinners
        wonMoney
        balance
        comission
    }
}
`;