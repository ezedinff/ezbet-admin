const fixtureFilters = [
    'Sport', 'League', "Enable/disabled", "Match Status"
];

export const fixtures = [
    {
        id: "1",
        key: "1",
        startTime: Date(),
        sport: "Soccer",
        teams: "Man utd vs Liverpool",
        league: "Premier League",
        isAvailable: true,
        status: "Not Started"
    },
    {
        id: "2",
        key: "2",
        startTime: Date(),
        sport: "Soccer",
        teams: "Belgium vs Belarus",
        league: "World Cup group stage",
        isAvailable: false,
        status: "Not Started"
    }
];
export const fixturesColumns = [
    {
        title: "ID",
        dataIndex: "id"
    },
    {
        title: "Starting Time",
        dataIndex: "startTime"
    },
    {
        title: "Sport",
        dataIndex: "sport"
    },
    {
        title: "Participants",
        dataIndex: 'teams'
    },
    {
        title: "League",
        dataIndex: "league"
    },
    {
        title: "Match Status",
        dataIndex: "status"
    }
];