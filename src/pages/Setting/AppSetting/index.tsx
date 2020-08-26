import React, { useEffect } from 'react';
import {Button, Card, Form, Input} from "antd";
import {CustomForm} from "../../../components/CustomForm";
import {appSettingForm} from "./form";
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { APP, UPDATE_APP } from '../../../shared/graphql/app.gql';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 21, span: 3 },
};
export const AppSetting = (props: {user: any, app: any}) => {
    const [form] = Form.useForm();
    const [updateApp, {data: league, loading: isUpdating, error: isFailed}] = useMutation(UPDATE_APP);
    form.setFieldsValue(props.app)
    const onFinish = (values: any) => {
        console.log(values);
        if(props.user.role === "SUPER_ADMIN") {
            // update
            updateApp(
                {
                    variables: {
                        id: props.app._id,
                        appInput: values
                    }
                }
            )
        }
    };
    return (
        <CustomForm title={"Basic App Settings"} form={form} onFinish={onFinish} elements={appSettingForm}/>
    );
};