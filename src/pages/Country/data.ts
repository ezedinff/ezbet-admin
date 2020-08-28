const uuidv1 = require('uuid/v1');
export const countries = [
    {
        id: '1',
        key: '1',
        name: 'Ethiopia',
        isAvailable: true,
        order: 1
    }
];

export const countryColumns = [
    {
        key: uuidv1(),
        title: 'ID',
        dataIndex: 'id'
    },
    {
        key: uuidv1(),
        title: 'Name',
        dataIndex: 'name'
    },
    {
        key: uuidv1(),
        title: 'Rank',
        dataIndex: 'order'
    },
    {
        key: uuidv1(),
        title: 'Status',
        dataIndex: 'isAvailable',
        render: (_: boolean) => _ ? "Enabled" : "Disabled"
    }
];