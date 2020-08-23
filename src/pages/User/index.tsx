import React, { useEffect, useState } from 'react';
import './index.less';
import { useLazyQuery } from '@apollo/react-hooks';
import { USERS } from '../../shared/graphql/user.gql';
import { FullPageLoader } from '../../components/Loaders/FullPageLoader';
import { DataTable } from '../../components/DataTable';
import { userColumns } from './data';
import { Button, Modal } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import CustomDialog from '../../components/CustomDialog';
import { useHistory } from 'react-router-dom';
import { useConfirmation } from '../../components/CustomDialog/confirm';
import { title } from 'process';
import UserEdit from './UserEdit';

const uuidv1 = require('uuid/v1');

export const User = () => {
    const [getUsers, {data, loading, error, refetch}] = useLazyQuery(USERS);
    const [visible, setvisible] = useState(false);
    const history = useHistory();
    useEffect(() => {
        getUsers();
        if(!userColumns.find(column => column.title === "Actions")) {
            userColumns.push(actions);
        }
     }, []);
    const handleOk  = () =>  {
        setvisible(false);
        console.log("Clicked!");
    }
    const handleCancel  = () =>  {
        setvisible(false);
        console.log("Clicked!");
    }

    const tryToKill = () => {
        setvisible(true);
      };
    
    const actions = {
        title: "Actions",
        key: uuidv1(),
        render: (text: any, record: any) => {
            return (
                <>
                     <Button key={uuidv1()} onClick={() => history.push(`/admin/users/${record._id}`)} type="primary" icon={<EditOutlined translate/>} />
                     &nbsp;
                     <Button key={uuidv1()} onClick={() => history.push(`/admin/users/${record._id}`)} icon={<EyeOutlined translate/>} />
                     &nbsp;
                     <Button key={uuidv1()} onClick= {() => setvisible(true)} danger icon={<DeleteOutlined translate/>} />
                </>
            )
        }
    }
    return loading || !data ? <FullPageLoader/> : (
        <>
        <Modal
        title={title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        >
            <UserEdit/>
        </Modal>
            <DataTable columns={userColumns} data={data.users} title={"Users"} updateFn={() => {}}/>
        </>
    );
};