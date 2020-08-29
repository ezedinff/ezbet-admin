import gql from "graphql-tag";

export const REPORT = gql`
query GetReport($from: String, $to: String) {
    report(from: $from, to: $to){
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