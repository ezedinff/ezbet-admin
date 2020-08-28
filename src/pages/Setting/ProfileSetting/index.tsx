import React, {Fragment} from 'react';
import {Form} from "antd";
import {CustomForm} from "../../../components/CustomForm";
import {profileSettingForm} from "./form";
import {ProfileImageSetting} from "../ProfileImageSetting";
import { useMutation } from 'react-apollo';
import { UPDATE_USER } from '../../../shared/graphql/user.gql';
export const ProfileSetting = (props: {user: any}) => {
    const [form] = Form.useForm();
    form.setFieldsValue(props.user);
    const [updateUser, {data: user, loading, error}] = useMutation(UPDATE_USER);
    const onFinish = () => {
        if(form.isFieldsTouched()) {
            updateUser({
                variables: {
                    id: props.user._id,
                    updateInput: form.getFieldsValue()
                }
            })
        }
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