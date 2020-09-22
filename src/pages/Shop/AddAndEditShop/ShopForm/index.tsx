import React,{useEffect, useState} from 'react'

import {Button, Card, Form, Input, Select, Col, Row, message} from "antd";
import { PlusOutlined, EnvironmentOutlined, SaveOutlined, MinusOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/react-hooks';
import {useHistory} from 'react-router-dom'

import { CREATE_SHOP, UPDATE_SHOP } from '../../../../shared/graphql/shop.gql';

const ShopForm = (props: any) => {
    const {createOrEdit, admins, shop} = props
    const [form] = Form.useForm();
    const getPosition = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            form.setFieldsValue({lat: position.coords.latitude, lon: position.coords.longitude});
        })
    }

    const initialContactFormFields = createOrEdit === 'CREATE' ? 
                [[
                    {label: "Contact Type", name: "type_1"},
                    {label: "Value", name: "value_1"}
                ]] : 
                shop.contacts.map((contact:any, index:any) => (
                    [
                        {label: "Contact Type", name: `type_${index+1}`},
                        {label: "Value", name: `value_${index+1}`}
                    ]
                ))
               
    const initialContactTypes:any = {}
    const initialContactValues:any = {}
    if(createOrEdit === 'EDIT') {
            shop.contacts.map((contact:any,index:any) => {
                initialContactTypes[`type_${index+1}`] = contact.type
                initialContactTypes[`value_${index+1}`] = contact.value
        })
    }
    const [contactFormElements, setContactFormElements] = useState(initialContactFormFields)
    const [lastContactFormElement, setLastContactFormElement] = useState(contactFormElements.length)
    const addContactFormElement = () => {
        const element = [
            [
                {label: "Contact Type", name: `type_${lastContactFormElement + 1}`},
                {label: "Value", name: `value_${lastContactFormElement + 1}`}
            ]
        ]
        const elements = contactFormElements.concat(element);
        setContactFormElements(elements);
        setLastContactFormElement(lastContactFormElement+1)
        console.log(contactFormElements)
    }
    useEffect(()=>{
        console.log(contactFormElements)
    },[contactFormElements])
    const removeContact = (index:any) => {
        if(contactFormElements.length>1){
            let newContactFormElements = contactFormElements
            newContactFormElements.splice(index,1)
            setContactFormElements([...newContactFormElements])
        }
        else{
            message.warning('You should atleast have one contact information')
        }
    }

    const [formLoading, setFormLoading] = useState(false)
    const mutationToUse = createOrEdit === 'CREATE' ? CREATE_SHOP : UPDATE_SHOP
    const [mutate] = useMutation(mutationToUse)
    const history = useHistory()
    const onFinish = (values: any) => {
        setFormLoading(true)
        const contacts = contactFormElements.map((elements:any) => ({
            type: values[elements[0].name],
            value: values[elements[1].name]
        }));

        const location = {lat: values.lat, lon: values.lon}
        const variables: any = {shopInput:{branchName: values.branchName, adminId: values.admin, contacts, location}}
        if(createOrEdit === 'EDIT'){
            variables['id'] = shop._id
        } 
        mutate({variables: {...variables}})
        .then((data)=>{
            setFormLoading(false)
            history.replace('/admin/shops')
        })
        .catch((err)=>{
            setFormLoading(false)
            console.log(err)
        })
    }

    const initialValues = createOrEdit === 'CREATE' ? 
     {branchName: null, admin: null, lat: null, lon: null,...initialContactTypes,...initialContactValues } : 
     {branchName: shop.branchName, admin: shop.admin._id, lat: shop.location.lat, lon: shop.location.lon, ...initialContactTypes, ...initialContactValues}
    
    
    return(
        <Form
        form={form}
        name="Create-Shop" 
        onFinish={onFinish}
        initialValues={initialValues}
        >
            <Card
            extra={<Button icon={<SaveOutlined translate/>} type="primary" loading={formLoading} htmlType="submit">Save</Button>}
            title={createOrEdit === "CREATE" ? "Create a shop" : "Update shop"}>
                    <Row  gutter={24}>
                        <Col  lg={12} md={24}>
                            <fieldset>
                                <legend>Basic Information:</legend>
                                <Form.Item name={"branchName"} label={"Branch Name"}>
                                    <Input placeholder={"Branch Name"}/>
                                </Form.Item>

                                <Form.Item name={"admin"} label={"Select Admin"}>
                                    <Select placeholder={"Select Admin"}>
                                        {admins.users.map((user: any) =>(
                                        <Select.Option key={user._id} value={user._id}>
                                            {`${user.firstName} ${user.lastName}`}
                                        </Select.Option>))}
                                    </Select>
                                </Form.Item>
                            </fieldset>
                        </Col>

                        <Col  lg={12} md={24}>
                            <fieldset>
                                <legend style={{width: "100%", position: "relative"}}>
                                    Shop Address:
                                    <Button 
                                    onClick={addContactFormElement} 
                                    style={{position: "absolute", right: "0px", bottom: "8px"}}
                                    icon={<PlusOutlined translate/>}
                                    >
                                        Add More
                                    </Button>
                                </legend>
                                {
                                    contactFormElements.map((element:any,index:any) => {
                                        return (
                                                <Row gutter={16} key={element[0].name}>
                                                    <Col lg={10} md={24}>
                                                        <Form.Item name={element[0].name} label={element[0].label}>
                                                            <Select placeholder={"Contact Type"}>
                                                                <Select.Option value={"PHONE"}>Phone Number</Select.Option>
                                                                <Select.Option value={"E-MAIL"}>E-mail</Select.Option>
                                                            </Select>
                                                        </Form.Item>   
                                                    </Col>
                                                    <Col lg={12} md={24}>
                                                        <Form.Item name={element[1].name} label={element[1].label}>
                                                            <Input placeholder={element[1].label}/>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col lg={2}>
                                                        <Button 
                                                        type="primary" 
                                                        danger shape="circle" 
                                                        size="small"
                                                        icon={<MinusOutlined translate style={{color: '#ffffff'}}/>} 
                                                        onClick={()=>removeContact(index)}/>
                                                    </Col>
                                                </Row>
                                        );
                                    })
                                }
                            </fieldset>
                        </Col>

                        <Col  lg={12} md={24}>
                            <fieldset>
                                <legend style={{width: "100%", position: "relative"}}>
                                    Location:
                                    <Button 
                                    onClick={getPosition} 
                                    style={{position: "absolute", right: "0px", bottom: "8px"}} 
                                    icon={<EnvironmentOutlined translate/>}>
                                        Get Current Position
                                    </Button>
                                </legend>
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
export default ShopForm;