import React, { useEffect, useState } from 'react';
import './index.less';
import { useLazyQuery } from '@apollo/react-hooks';
import { USERS } from '../../shared/graphql/user.gql';
import { FullPageLoader } from '../../components/Loaders/FullPageLoader';
import { DataTable } from '../../components/DataTable';
import { userColumns } from './data';
import { Button } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import CustomDialog from '../../components/CustomDialog';
import { useHistory } from 'react-router-dom';
import { useConfirmation } from '../../components/CustomDialog/confirm';
import { title } from 'process';
import UserEdit from './UserEdit';

const uuidv1 = require('uuid/v1');

export const User = () => {
    const [getUsers, {data, loading, error, refetch}] = useLazyQuery(USERS,{fetchPolicy :'network-only'});
    const history = useHistory();
    useEffect(() => {
        getUsers();
        if(!userColumns.find(column => column.title === "Actions")) {
            userColumns.push(actions)
        }
     }, []);
    
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
                     <Button key={uuidv1()} onClick= {()=>alert('deleted')} danger icon={<DeleteOutlined translate/>} />
                </>
            )
        }
    }
    return loading || !data ? <FullPageLoader/> : (
        <>
            <DataTable 
            extras ={<Button onClick={()=>history.push(`/admin/users/0`)} icon={<PlusOutlined translate/>}>
                        Create New User
                    </Button>}
             columns={userColumns} data={data.users} title={"Users"} updateFn={() => {}}
             />
        </>
    );
};