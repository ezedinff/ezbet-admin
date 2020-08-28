const uuidv1 = require('uuid/v1');

export const boards = [
    {
        title: "Total Income",
        number: 5200,
        color: "#22af83",
        icon: "rise",
        key: uuidv1()
    },        {
        title: "Users",
        number: 50,
        color: "#5c6bc0",
        icon: "team",
        key: uuidv1()
    },        {
        title: "Total Bets",
        number: 325,
        color: "#f8ae59",
        icon: "dashboard",
        key: uuidv1()
    },

];

export const favMatches = [
    {
        id: "1",
        name: "Man Utd. vs Liverpool",
        sport: "Soccer",
        betCount: "542"
    }
];

export const favMatchesColumns = [
    {
        key: uuidv1(),
        title: "Name",
        dataIndex: "name"
    },
    {
        key: uuidv1(),
        title: "Sport",
        dataIndex: "sport"
    },
    {
        key: uuidv1(),
        title: "Bet Count",
        dataIndex: "betCount"
    }
];

export const favMarkets = [
    {
        id: "625",
        name: "Double Chance",
        betCount: "105"
    }
];

export const favMaarketColumns = [
    {
        key: uuidv1(),
        title: "Market ID",
        dataIndex: "id"
    },
    {
        key: uuidv1(),
        title: "Name",
        dataIndex: "name"
    },
    {
        key: uuidv1(),
        title: "Bet Count",
        dataIndex: "betCount"
    }
];