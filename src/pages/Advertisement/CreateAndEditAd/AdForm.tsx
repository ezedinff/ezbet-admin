import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Card, Form, Input, Select, Button, Space } from "antd";
import { Avatar } from "../../../components/avator";
import { SaveOutlined } from "@ant-design/icons";
import {
  UPDATE_APP,} from "../../../shared/graphql/app.gql";

const uuidv1 = require("uuid/v1");

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const AdForm = (props: any) => {
  const history = useHistory();

  const { mode, ads, adToEditId, appId } = props;
  const [mutate] = useMutation(UPDATE_APP);

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
    console.log("ads", ads);
    let variables = {};
    const values = form.getFieldsValue();
    const adsWithoutTypeName = ads.map((ad: any) => {
      if (ad.__typename) {
        delete ad.__typename;
      }
      return ad;
    });
    if(mode === "CREATE"){
      adsWithoutTypeName.push(values);
    }
    else{
      const adToEdit = adsWithoutTypeName.findIndex((ad:any) => ad.id === adToEditId)
      if(adToEdit >= 0){
        ads[adToEdit] = {...values, id: adsWithoutTypeName[adToEdit].id}
      }
    }
    variables = {
      id: appId,
      appInput: { advertisements: [...adsWithoutTypeName] },
    };
    mutate({ variables })
      .then(() => {
        setFormLoading(false);
        history.push("/admin/advertisements")
      })
      .catch((e) => {
        setFormLoading(false);
        console.log(e);
      });
  };


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
          <div style={{ margin : "10px 0 10px 10%" }}>
            <div style={{fontWeight: 'bolder'}}>Uploaded Image</div>
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
