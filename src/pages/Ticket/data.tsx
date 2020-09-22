import React from 'react'
import { Tag } from 'antd';
import { Form, FormType } from '../../shared/interfaces/form';
import __UnixTimeConverter from '../../utils/unixTimeConverter'


const uuidv1 = require('uuid/v1');

export const ticketColumns: any[] = [
    {
        key: uuidv1(),
        title: 'Ticket code',
        dataIndex: 'ticketID',
    },
    {
        key: uuidv1(),
        title: 'Status',
        dataIndex: 'status',
        render: (status: string) => <Tag color={status === 'PENDING' ?'orange': status === 'WIN' ? 'green' :'red'}>{status}</Tag>
    },
    {
        key: uuidv1(),
        title: 'Date',
        dataIndex: 'updatedAt',
        render: (updatedAt:string) => <p>{__UnixTimeConverter(updatedAt)}</p>
    },
    {
      key: uuidv1(),
      title: 'Placed',
      dataIndex: 'isPlaced',
      render: (isPlaced: boolean) => <Tag color={isPlaced? 'green':'red'}>{isPlaced ? "YES" : "NO"}</Tag>
    },
];


export const ticketFilters: Form[] = [
    {
        name: "ticketID",
        label: "Ticket code",
        type: FormType.TEXT,
    },
];