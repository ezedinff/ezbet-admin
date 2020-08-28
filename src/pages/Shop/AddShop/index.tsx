import React, { useEffect, useState } from 'react';
import { useLazyQuery } from 'react-apollo';
import { SHOPS, CREATE_SHOP } from '../../../shared/graphql/shop.gql';
import {Button, Card, Form, Input, InputNumber, Select, Col, Row} from "antd";
import { USERS } from '../../../shared/graphql/user.gql';
import { FullPageLoader } from '../../../components/Loaders/FullPageLoader';
import { PlusOutlined, EnvironmentOutlined, SaveOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/react-hooks';

const AddShop: React.FC = (props: any) => {
    const { match: { params } } = props;
    const [getShop, {data: shop, loading: isLoading, error: isFailed}] = useLazyQuery(SHOPS);
    const [getAdmins, {data: admins, loading: isAdminLoading, error: isAdminFailed}] = useLazyQuery(USERS);
    const [createShop, {data: newShop, loading: creating, error: creatingFailed}] = useMutation(CREATE_SHOP);
    // get addmins
    const [form] = Form.useForm();
    const [contactFormElements, setContactFormElements] = useState([
        [
            {label: "Contact Type", name: "type_1"},
            {label: "Value", name: "value_1"}
        ]
    ])
    console.log(params);
    useEffect(() => {
        getAdmins({
            variables: {
                role: "ADMIN"
            }
        })
        if(params.id != "0") {
            getShop(
                {
                    variables: {
                        id: params.id
                    }
                }
            )
        }
    }, [])
    const getPosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            form.setFieldsValue({lat: position.coords.latitude, lon: position.coords.longitude});
        })
    }
    const onFinish = (values: any) => {
        const contacts = contactFormElements.map((elements) => ({
            type: values[elements[0].name],
            value: values[elements[1].name]
        }));
        
        createShop({
            variables: {
                shopInput: {
                    branchName: values['branchName'],
                    adminId: values['admin'],
                    contacts,
                    location: {lat: values['lat'], lon: values['lon']}
                }
            }
        });
    }
    const addElement = () => {
        const element = [
            [
                {label: "Contact Type", name: `type_${contactFormElements.length + 1}`},
                {label: "Value", name: `value_${contactFormElements.length + 1}`}
            ]
        ]
        const elements = contactFormElements.concat(element);
        console.log(elements);
        setContactFormElements(elements);
    }
    return isAdminLoading || !admins ? <FullPageLoader/> : (
        <Form
        form={form}
        name="Create-Shop" onFinish={onFinish}
        >
   <Card
    extra={<Button icon={<SaveOutlined translate/>} type="primary" htmlType="submit">Save</Button>}
    title={params.id == "0" ? "Create A shop" : "Update A Shop"}>
                       <Row  gutter={24}>
                <Col  lg={12} md={24}>
                    <fieldset>
                        <legend>Basic Information:</legend>
                        <Form.Item name={"branchName"} label={"Branch Name"}>
                            <Input placeholder={"Branch Name"}/>
                        </Form.Item>

                        <Form.Item name={"admin"} label={"Select Admin"}>
                            <Select
                                placeholder={"Select Admin"}
                            >
                                {admins.users.map((user: any) => <Select.Option key={user._id} value={user._id}>{`${user.firstName} ${user.lastName}`}</Select.Option>)}
                            </Select>
                        </Form.Item>
                    </fieldset>
                </Col>

                <Col  lg={12} md={24}>
                    <fieldset>
                        <legend style={{width: "100%", position: "relative"}}>Shop Address:<Button onClick={addElement} style={{position: "absolute", right: "0px", bottom: "8px"}} icon={<PlusOutlined translate/>}>Add More</Button></legend>
                        {
                            contactFormElements.map((elements) => {
                                return (
                                    <>
                                        <Row gutter={16}>
                                            <Col lg={12} md={24}>
                                                <Form.Item name={elements[0].name} label={elements[0].label}>
                                                    <Select placeholder={"Contact Type"}>
                                                        <Select.Option value={"PHONE"}>Phone Number</Select.Option>
                                                        <Select.Option value={"E-MAIL"}>E-mail</Select.Option>
                                                    </Select>
                                                </Form.Item>   
                                            </Col>
                                            <Col lg={12} md={24}>
                                                <Form.Item name={elements[1].name} label={elements[1].label}>
                                                    <Input placeholder={elements[1].label}/>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </>
                                );
                            })
                        }
                    </fieldset>
                </Col>

                <Col  lg={12} md={24}>
                     <fieldset>
                        <legend style={{width: "100%", position: "relative"}}>Location:<Button onClick={getPosition} style={{position: "absolute", right: "0px", bottom: "8px"}} icon={<EnvironmentOutlined translate/>}>Get Current Position</Button></legend>
                        <Row gutter={16}>
                            <Col lg={12} md={24}>
                                <Form.Item name={"lat"} label={"Latitude"}>
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col lg={12} md={24}>
                                <Form.Item name={"lon"} label={"Longitude"}>
                                    <Input/>
                                </Form.Item>
                            </Col>
                        </Row>
                     </fieldset>
                </Col>
            </Row>
        </Card>
        </Form>
      
    );
}

export default AddShop;