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
        title: 'ID',
        dataIndex: 'id'
    },
    {
        title: 'Name',
        dataIndex: 'name'
    },
    {
        title: 'Rank',
        dataIndex: 'order'
    },
    {
        title: 'Status',
        dataIndex: 'isAvailable',
        render: (_: boolean) => _ ? "Enabled" : "Disabled"
    }
];