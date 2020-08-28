import React, { useEffect, useState } from 'react';
import './index.less';
import { Table, Button, Form } from 'antd';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { FullPageLoader } from '../../components/Loaders/FullPageLoader';
import { APP, UPDATE_APP } from '../../shared/graphql/app.gql';
import CreateAd from './CreateAd';
import { PlusOutlined } from '@ant-design/icons';
import { addListener } from 'process';
import addColumns from './data';

const uuidv1 = require('uuid/v1');
export const Advertisement = () => {
    // get the app here
    const [app, {data: appData, loading: appLoading, error: appError, refetch: appRef}] = useLazyQuery(APP);
    const [updateApp, {data: league, loading: isUpdating, error: isFailed}] = useMutation(UPDATE_APP);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        app();
    }, [])

    const onFinish = () => {}
    const onSave = () => {
        const ads = appData.app.advertisements;
        ads.push(form.getFieldsValue())
        updateApp({
            variables: {
                id: appData.app._id,
                appInput: {
                    advertisements: ads
                }
            }
        })
        setOpen(false);
    }
    return  appLoading || !appData ? <FullPageLoader/> :(
        <>
        <Button type="primary" icon={<PlusOutlined translate/>} onClick={() => {form.resetFields(); setOpen(true)}}>
          Create Ad
        </Button>
              <CreateAd
               isOpen={open}
               handleOk={onSave}
                handleCancel={() => setOpen(false)}
                okText={"Save"}
                form={form}
                onFinish={onFinish}
                />
              <Table dataSource={appData.app.advertisements} columns={addColumns} rowKey={uuidv1()}/>
        </>
    );
};