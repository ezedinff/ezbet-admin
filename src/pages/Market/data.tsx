import { Tag } from 'antd';
import React from 'react';
const filters = [
    'soccer',
    'basketball',
    'baseball'
];

export const bets = [
    {
        id: "",
        name: "",
        isAvailable: "",
        order: "",
        sport: "",
    }
];
// 'ID', 'name', 'enabled/disabled', "Rank"
export const marketColumns = [
    {
        title: "ID",
        dataIndex: "id"
    },
    {
        title: "Name",
        dataIndex: "name"
    },
    {
        title: "Status",
        dataIndex: "isAvailable",
        render: (status: boolean) => {
            const value = status
             ? {color: "green", title: "Active"}
             : {color: "red", title: "InActive"};
        return <Tag color={value.color}>{value.title}</Tag> ;
        }
    }
];