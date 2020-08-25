import { Form, FormType } from '../../shared/interfaces/form';

export const leagues = [
    {
        id: '1',
        key: '1',
        name: 'Premier League',
        order: 1,
        country: 'England',
        sport: 'Soccer',
        isAvailable: true
    }
];

export const leagueForm: Form[] = [
    {
        name: "name",
        label: "League Name",
        type: FormType.TEXT
    },
    {
        name: "country",
        label: "Country",
        type: FormType.SELECT
    }
];

export const leagueColumns = [
    {
        title: "ID",
        dataIndex: 'id',
    },
    {
        title: "Name",
        dataIndex: 'name'
    },
    {
        title: 'Rank',
        dataIndex: 'order'
    },
    {
        title: 'Country',
        dataIndex: 'country'
    },
    {
        title: 'Sport',
        dataIndex: 'sport',
        render: (text: string) => !!text ? text : "Soccer"
    }
];