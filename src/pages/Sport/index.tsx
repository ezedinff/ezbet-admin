import React from 'react';
import './index.less';
import {Table} from "antd";
import {sportColumns, sports} from "./data";

export const Sport = () => {
    const rowSelection = {
        selectedRowKeys: sports.filter(sport => sport.isAvailable).map(sport => sport.key),
        onChange: (selectedRowKeys: any, selectedRows: any) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: { name: string; }) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    return (
        <Table dataSource={sports} columns={sportColumns} rowSelection={{type: 'checkbox', ...rowSelection,  hideSelectAll: true}}/>
    );
};