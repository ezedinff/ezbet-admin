import React, {Fragment} from 'react';
import {Form} from "antd";
import {CustomForm} from "../../../components/CustomForm";
import {profileSettingForm} from "./form";
import {ProfileImageSetting} from "../ProfileImageSetting";
export const ProfileSetting = (props: {user: any}) => {
    const [form] = Form.useForm();
    form.setFieldsValue(props.user);
    const onFinish = () => {

    };
    return (
        <Fragment>
            <CustomForm title={"Profile Settings"}
                        form={form}
                        onFinish={onFinish}
                        elements={profileSettingForm}
                        type={"PROFILE"}
            >
                <ProfileImageSetting user={props.user}/>
            </CustomForm>
        </Fragment>
    );
};