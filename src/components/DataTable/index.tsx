import React, { useRef } from "react";
import { PageHeader, Button } from "antd";
import PrintableTable from "./PrintableTable";
import Filter from "../Filter";
import { Form } from "../../shared/interfaces/form";
import { useReactToPrint } from "react-to-print";
import { PrinterTwoTone } from "@ant-design/icons";
// table needs title, data, columns
// table needs filters?

// get the data from services, send the data to functions to cast it to required structure
export function DataTable(props: {
  data: any;
  updateFn: Function;
  columns: any;
  title: string;
  formElements?: Form[];
  formData?: { intialValues?: any; selectValues?: any };
  onSubmit?: Function;
  extras?: any;
  printable?: any;
}) {
  console.log(props.formElements);
  function getRowSelection(data: any[]) {
    return {
      hideSelectAll: true,
      selectedRowKeys: data.filter((d) => d.isAvailable).map((d) => d._id),
      onSelect: async (record: any, selected: boolean) => {
        const reponse = await props.updateFn({
          variables: {
            id: record._id,
            updateInput: {
              isAvailable: selected,
            },
          },
        });
        console.log(record, selected);
      },
      getCheckboxProps: (record: {
        _id: string;
        name: string;
        isAvailable: boolean;
      }) => ({
        disabled: record.name === "Disabled User", // Column configuration not to be checked
        name: record.name,
      }),
    };
  }

  const componentRef: any = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <PageHeader
        extra={props.extras}
        onBack={() => window.history.back()}
        className="site-page-header"
        title={props.title}
      >
        {props.formElements && (
          <Filter
            onSubmit={props.onSubmit}
            formElements={props.formElements}
            formData={props.formData}
          />
        )}
      </PageHeader>
      <Button
        style={{
          display: props.printable ? "block" : "none",
          marginBottom: "5px",
        }}
        onClick={handlePrint}
      >
        Print table
      </Button>
      <PrintableTable
        title={props.title}
        ref={componentRef}
        dataSource={props.data}
        columns={props.columns}
        rowSelection={getRowSelection(props.data)}
        rowKey={(record: any) => record._id}
      />
    </div>
  );
}
