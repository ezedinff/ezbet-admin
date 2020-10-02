import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Card, Form, Input, Row, Col, Select, Button, Space } from "antd";
import { Avatar } from "../../../components/avator";
import { SaveOutlined } from "@ant-design/icons";
import {
  UPDATE_APP,
  UPDATE_ADVERTISEMENT,
} from "../../../shared/graphql/app.gql";

const uuidv1 = require("uuid/v1");

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const AdForm = (props: any) => {
  const history = useHistory();

  const { mode, ads, adToEditId, appId } = props;
  const mutationToUse = mode === "CREATE" ? UPDATE_APP : UPDATE_ADVERTISEMENT;
  const [mutate] = useMutation(mutationToUse);

  const [form] = Form.useForm();
  const [formLoading, setFormLoading] = useState(false);

  const getInitialValues = () => {
    console.log("advertisements", ads);
    if (mode === "EDIT") {
      const currentAd = ads.find((ad: any) => ad.id === adToEditId);
      if (currentAd) {
        return {
          name: currentAd.name,
          position: currentAd.position,
          imagePath: currentAd.imagePath,
          id: currentAd.id,
        };
      }
    }
    return { name: null, position: null, imageUrl: null, id: uuidv1() };
  };

  const handleUpload = (imageUrl: string) => {
    form.setFieldsValue({ imagePath: imageUrl });
  };

  const onFinish = () => {
    setFormLoading(true);
    console.log("fields submitted", form.getFieldsValue());
    let variables = {};
    const values = form.getFieldsValue();
    if (mode === "CREATE") {
      ads.push(values);
      variables = { id: appId, appInput: { advertisements: [...ads] } };
    } else {
      variables = { id: appId, adInput: values };
    }
    mutate({ variables })
      .then(() => {
        setFormLoading(false);
        console.log("Manupulated ad");
      })
      .catch((e) => {
        setFormLoading(false);
        console.log(e);
      });
  };

  // variables: {
  //   id: appId,
  //   appInput: {
  //     advertisements: ads,
  //   },
  // },

  return (
    <Form
      initialValues={getInitialValues()}
      form={form}
      {...layout}
      name="control-hooks"
      onFinish={onFinish}
    >
      <Card
        title={
          mode === "CREATE" ? "Create advertisement" : "Edit advertisement"
        }
        extra={
          <Space size="small">
            <Button onClick={() => history.push("/admin/advertisements")}>
              Cancel
            </Button>
            <Button
              icon={<SaveOutlined translate="true" />}
              type="primary"
              loading={formLoading}
              htmlType="submit"
            >
              Save
            </Button>
          </Space>
        }
      >
        <Form.Item name={"id"}>
          <Input hidden />
        </Form.Item>
        <Form.Item
          name={"name"}
          label={"Name"}
          rules={[{ required: true }]}
          hasFeedback
        >
          <Input placeholder={"Name"} />
        </Form.Item>
        <Form.Item
          name={"position"}
          label={"Position"}
          rules={[{ required: true }]}
          hasFeedback
        >
          <Select
            showSearch
            placeholder={"Position"}
            optionFilterProp="children"
          >
            <Select.Option key={"Header"} value={"Header"}>
              Header
            </Select.Option>
            <Select.Option disabled key={"Side"} value={"Side"}>
              Side
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={"imagePath"}
          label={"Image"}
          rules={[{ required: true }]}
          hasFeedback
        >
          <Input hidden={true} />
        </Form.Item>
        <div style={{ marginLeft: "10%" }}>
          <Avatar handleUpload={handleUpload} />
        </div>
        {mode === "EDIT" && (
          <div style={{ marginLeft: "10%" }}>
            <div>Uploaded Image</div>
            <img
              width="500px"
              height="100px"
              src={getInitialValues().imagePath}
              style={{ objectFit: "cover" }}
              alt="ad-img"
            />
          </div>
        )}
      </Card>
    </Form>
  );
};
export default AdForm;
