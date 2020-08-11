import React from 'react';
import {Button, Card, Form, Input} from "antd";
import {CustomForm} from "../../../components/CustomForm";
import {appSettingForm} from "./form";
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 21, span: 3 },
};
export const AppSetting = () => {
    const [form] = Form.useForm();
    const onFinish = () => {};
    return (
        <CustomForm title={"Basic App Settings"} form={form} onFinish={onFinish} elements={appSettingForm}/>
    );
};