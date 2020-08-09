import React from 'react';
import './index.less';
import {Table} from "antd";
import {countries, countryColumns} from "./data";
import {sports} from "../Sport/data";
export const Country = () => {
    let data = countries;
    const rowSelection = {
        hideSelectAll: true,
        selectedRowKeys: data.filter(country => country.isAvailable).map(country => country.key),
        onChange: (selectedRowKeys: any, selectedRows: any) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (d: any) => {
            console.log(d, 'fuck');
            data.forEach((country: any) => {
                if (country.id === d.id){
                    country.isAvailable = !country.isAvailable;
                }
            });
            console.log(data);
        }
/*        getCheckboxProps: (record: { name: string; }) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),*/
    };
    return (
        <Table columns={countryColumns} dataSource={data} rowSelection={{...rowSelection}}/>
    )
};

// component takes query type and manage accordingly