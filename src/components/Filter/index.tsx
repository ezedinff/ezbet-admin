import * as React from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  InputNumber,
  Select,
} from "antd";
import { FormType } from "../../shared/interfaces/form";
import { DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const Filter = (props: {
  formElements?: { name: string; label: string; type: FormType }[];
  onSubmit?: Function;
  formData?: { intialValues?: any; selectValues?: any };
}) => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
    // @ts-ignore
    props.onSubmit(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const getFormElements = (
    elements: { name: string; label: string; type: FormType }[]
  ) => {
    return elements.map((element) => {
      switch (element.type) {
        case FormType.TEXT:
          return (
            <Col key={element.name} className="gutter-row" md={5}>
              <Form.Item name={element.name} label={element.label}>
                <Input placeholder={element.label} />
              </Form.Item>
            </Col>
          );
        case FormType.NUMBER:
          return (
            <Col key={element.name} className="gutter-row" md={5}>
              <Form.Item name={element.name} label={element.label}>
                <InputNumber
                  placeholder={element.label}
                  style={{ minWidth: "100%" }}
                />
              </Form.Item>
            </Col>
          );
        case FormType.SELECT:
          return (
            <Col className="gutter-row" md={5}>
              <Form.Item name={element.name} label={element.label}>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder={element.label}
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {props.formData &&
                    getOptions(props.formData.selectValues[element.name])}
                </Select>
              </Form.Item>
            </Col>
          );
        case FormType.DATE:
          return (
            <Col className="gutter-row" md={5}>
              <Form.Item name={element.name} label={element.label}>
                <RangePicker />
              </Form.Item>
            </Col>
          );
      }
    });
  };
  const getOptions = (options: { label: string; value: any[] }[]) => {
    return options.map((v: { label: string; value: any }) => (
      <Select.Option key={v.label} value={v.value}>
        {v.label}
      </Select.Option>
    ));
  };
  return (
    <Form
      {...layout}
      name="filter"
      initialValues={
        props.formData && props.formData.intialValues
          ? props.formData.intialValues
          : {}
      }
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {props.formElements && getFormElements(props.formElements)}
        <Col
          className="gutter-row"
          style={{ alignItems: "center", display: "flex" }}
          md={4}
        >
          <Form.Item>
            <Button
              icon={<SearchOutlined translate="true" />}
              style={{ bottom: "-18px", position: "relative" }}
              type="primary"
              htmlType="submit"
            >
              Search
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Filter;
