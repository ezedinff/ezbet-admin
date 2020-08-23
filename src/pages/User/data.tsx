import { Tag, Button } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import React from 'react';
const uuidv1 = require('uuid/v1');
export const userColumns: any[] = [
    {
        title: "First Name",
        key: uuidv1(),
        dataIndex: "firstName",
        render: (firstName: string) => (`${firstName[0].toUpperCase()}${firstName.substring(1, firstName.length)}` )
    },
    {
        title: "Last Name",
        key: uuidv1(),
        dataIndex: "lastName",
        render: (lastName: string) => (`${lastName[0].toUpperCase()}${lastName.substring(1, lastName.length)}` )
    },
    {
        title: "Status",
        key: uuidv1(),
        dataIndex: "isActive",
        render: (status: boolean) => {
            const value = status
             ? {color: "green", title: "Active"}
             : {color: "red", title: "InActive"};
        return <Tag color={value.color}>{value.title}</Tag> ;
        }
    },
    {
        title: "Username",
        key: uuidv1(),
        dataIndex: "username"
    },
    {
        title: "Verfied",
        key: uuidv1(),
        dataIndex: "isVerfied",
        render: (isVerfied: boolean) => {
            const value = isVerfied
             ? {color: "green", title: "Verified"}
             : {color: "red", title: "Not Verified"};
        return <Tag color={value.color}>{value.title}</Tag> ;
        }
    },
    {
        title: "Role",
        key: uuidv1(),
        dataIndex: "role"
    },
    {
        title: "Balance",
        key: uuidv1(),
        render: (text: any, record: any) => `${record.details.accountBalance} ETB`
    },
];

// users permission, who is authorized what