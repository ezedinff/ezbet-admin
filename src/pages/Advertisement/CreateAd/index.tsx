import * as React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { Avatar } from '../../../components/avator';
import styled from 'styled-components';
const uuidv1 = require('uuid/v1');

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const CreateAd: React.FC<{
    isOpen: boolean,
    handleOk: any,
    handleCancel: any,
    okText: string,
    form: any,
    onFinish: any
    }> = ({isOpen, handleOk, handleCancel, okText, form, onFinish}) => {
    const handleUpload = (imageUrl: string) => {
        form.setFieldsValue({imagePath: imageUrl, id: uuidv1()});
    }
    return (
    <Modal
        title="Create Advertisement Banner"
        visible={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={okText}
      >
          <Form form={form} {...layout} name="control-hooks" onFinish={onFinish}>
              <Form.Item name={"id"}>
                  <Input hidden/>
              </Form.Item>
            <Form.Item name={"name"} label={"Name"} rules={[{ required: true }]} hasFeedback>
                <Input placeholder={"Name"}/>
            </Form.Item>
            <Form.Item name={"position"} label={"Position"} rules={[{ required: true }]} hasFeedback>
                <Select
                    showSearch
                    placeholder={"Position"}
                    optionFilterProp="children"
                    >
                        <Select.Option key={"Header"} value={"Header"}>Header</Select.Option>
                        <Select.Option disabled key={"Side"} value={"Side"}>Side</Select.Option>
                    </Select>
            </Form.Item>
            <Form.Item name={"imagePath"} label={"Image"} rules={[{ required: true }]} hasFeedback>
                <Input hidden={true}/>
            </Form.Item>
          </Form>
          <div style={{textAlign: "center", position: "absolute", right: "128px", bottom: "64px"}}>
             <Avatar handleUpload={handleUpload}/>
          </div>
          <br/>
          <br/>
      </Modal>
    )
}
export default CreateAd;