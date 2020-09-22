import React from 'react';
import {Button, Card, Form, Input, InputNumber, Select, Col, Row} from "antd";
import { USERS } from '../../../shared/graphql/user.gql';
import { GET_SHOP } from '../../../shared/graphql/shop.gql';
import { FullPageLoader } from '../../../components/Loaders/FullPageLoader';
import { useQuery } from '@apollo/react-hooks';
import ShopForm from './ShopForm'

const AddOrEditShop: React.FC = (props: any) => {
    const { match: { params } } = props;
    const createOrEdit = params.id === '0' ? 'CREATE' : 'EDIT'
    const {data: admins, loading: areAdminsLoading, error: adminFailed}= useQuery(USERS,{variables:{role: 'ADMIN'}});
    const {data: shopData, loading: shopLoading, error: shopFailed} = 
        useQuery(GET_SHOP,{variables:{id: params.id}, skip:createOrEdit === 'CREATE'})
    
    if(areAdminsLoading || shopLoading) return <FullPageLoader/>
    if(adminFailed || shopFailed) return <h1>{shopFailed}</h1>
    return (createOrEdit === 'CREATE' ? 
    <ShopForm createOrEdit={createOrEdit} admins={admins}/> : 
    <ShopForm createOrEdit={createOrEdit} admins={admins} shop={shopData.shop}/>
    )
        
}

export default AddOrEditShop;