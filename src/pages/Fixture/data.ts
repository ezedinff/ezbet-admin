import { Form, FormType } from "../../shared/interfaces/form";

const fixtureFilters = [
    'Sport', 'League', "Enable/disabled", "Match Status"
];

export interface FixtureFilter {
    sport?: string;
    league?: number;
    isAvailable?: boolean;
    status?: string;
}

export const fixtureFilterForm: Form[] = [
    {
        label: "Sport",
        type: FormType.SELECT,
        name: "sport"
    },
    {
        label: "League",
        type: FormType.SELECT,
        name: "league"
    },
    {
        label: "Enable/disabled",
        type: FormType.SELECT,
        name: "isAvailable"
    },
    {
        label: "Match Status",
        type: FormType.SELECT,
        name: "status"
    },
];

export const FixtureStatus = {
    TBD : "Time To Be Defined",
    NS : "Not Started",
    "1H" : "First Half, Kick Off",
    HT : "Halftime",
    "2H" : "Second Half, 2nd Half Started",
    ET : "Extra Time",
    P : "Penalty In Progress",
    FT : "Match Finished",
    AET : "Match Finished After Extra Time",
    PEN : "Match Finished After Penalty",
    BT : "Break Time (in Extra Time)",
    SUSP : "Match Suspended",
    INT : "Match Interrupted",
    PST : "Match Postponed",
    CANC : "Match Cancelled",
    ABD : "Match Abandoned",
    AWD : "Technical Loss",
    WO : "WalkOver"
}
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
        dataIndex: "date"
    },
    {
        title: "Sport",
        dataIndex: "sport"
    },
    {
        title: "Participants",
        dataIndex: 'teams',
        render: (text: any, record: any) => `${record.teams.home.name} vs ${record.teams.away.name}` 
    },
    {
        title: "League",
        dataIndex: "league"
    },
    {
        title: "Match Status",
        dataIndex: "status",
        // @ts-ignore
        render: (text: string) => `${FixtureStatus[text]}`
    }
];