import { Form, FormType } from '../../shared/interfaces/form';
const uuidv1 = require('uuid/v1');
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
        key: uuidv1(),
        title: "ID",
        dataIndex: 'id',
    },
    {
        key: uuidv1(),
        title: "Name",
        dataIndex: 'name'
    },
    {
        key: uuidv1(),
        title: 'Rank',
        dataIndex: 'order'
    },
    {
        key: uuidv1(),
        title: 'Country',
        dataIndex: 'country'
    },
    {
        key: uuidv1(),
        title: 'Sport',
        dataIndex: 'sport',
        render: (text: string) => !!text ? text : "Soccer"
    }
];