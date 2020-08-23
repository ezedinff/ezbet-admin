import React from 'react';
import {sportColumns} from "../../pages/Sport/data";
import {Table, PageHeader} from "antd";

// table needs title, data, columns
// table needs filters?

// get the data from services, send the data to functions to cast it to required structure
export function DataTable(props: {data: any, updateFn: Function, columns: any, title: string}){
    function getRowSelection(data: any[]) {
        return {
            hideSelectAll: true,
            selectedRowKeys: data.filter(d => d.isAvailable).map(d => d._id),
            onSelect: async (record: any, selected: boolean) => {
                const reponse = await props.updateFn({
                    variables: {
                        id: record._id,
                        updateInput: {
                            isAvailable: selected
                        }
                    }
                });
                console.log(record, selected);
            },
            getCheckboxProps: (record: {_id: string, name: string, isAvailable: boolean}) => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
    }
    return (
        <div>
              <PageHeader
                className="site-page-header"
                title={props.title}
            />
        <Table dataSource={props.data} columns={props.columns} rowSelection={getRowSelection(props.data)} rowKey={record => record._id}/>
        </div>
    );
}