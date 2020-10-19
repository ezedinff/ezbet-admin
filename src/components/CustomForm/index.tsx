import React from "react";
import { Button, Card, Form, Input, InputNumber } from "antd";
import { FormType } from "../../shared/interfaces/form";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 21, span: 3 },
};
export const CustomForm = (props: any) => {
  const getFormElemets = (
    elements: { name: string; label: string; type: FormType }[]
  ) => {
    return elements.map((element) => {
      switch (element.type) {
        case FormType.TEXT:
          return (
            <Form.Item
              key={element.name}
              name={element.name}
              label={element.label}
              rules={[{ required: true }]}
              hasFeedback
            >
              <Input placeholder={element.label} />
            </Form.Item>
          );
        case FormType.NUMBER:
          return (
            <Form.Item
              key={element.name}
              name={element.name}
              label={element.label}
              rules={[{ required: true }]}
              hasFeedback
            >
              <InputNumber
                placeholder={element.label}
                style={{ minWidth: "100%" }}
              />
            </Form.Item>
          );
      }
    });
  };

  return (
    <Card title={props.title}>
      {props.type === "PROFILE" ? props.children : null}
      <Form
        form={props.form}
        {...layout}
        name="custom-form"
        onFinish={props.onFinish}
      >
        {getFormElemets(props.elements)}
        <Form.Item {...tailLayout} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
