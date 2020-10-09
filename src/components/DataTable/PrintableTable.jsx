import React from "react";
import { Table } from "antd";
import "./printableTable.css";
class PrintableTable extends React.Component {
  render() {
    return (
      <div>
        <h1 className="print-only">{this.props.title}</h1>
        <Table
          dataSource={this.props.dataSource}
          columns={this.props.columns}
          rowSelection={this.props.rowSelection}
          rowKey={this.props.rowKey}
        />
      </div>
    );
  }
}
export default PrintableTable;
