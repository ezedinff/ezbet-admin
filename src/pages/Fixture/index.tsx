import React from 'react';
import './index.less';
import {Table} from "antd";
import {fixtures, fixturesColumns} from "./data";

export const Fixture = () => {
    const rowSelection = {
        hideSelectAll: true,
        selectedRowKeys: fixtures.filter(fixture => fixture.isAvailable).map(fixture => fixture.key),
        onChange: (selectedRowKeys: any, selectedRows: any) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
/*        getCheckboxProps: (record: { name: string; }) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),*/
    };
    return (
        <Table columns={fixturesColumns} dataSource={fixtures} rowSelection={{...rowSelection}}/>
    );
};