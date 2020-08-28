import { Tag } from 'antd';
import React from 'react';
const uuidv1 = require('uuid/v1');
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
        key: uuidv1(),
        title: "ID",
        dataIndex: "id"
    },
    {
        key: uuidv1(),
        title: "Name",
        dataIndex: "name"
    },
    {
        key: uuidv1(),
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