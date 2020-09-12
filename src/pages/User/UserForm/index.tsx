import React, { useState } from 'react'
import {Form,Input, Button, Select, Card, Tooltip, Row, Col, Space} from "antd";
import { SaveOutlined, DownOutlined ,InfoCircleOutlined } from '@ant-design/icons';
import {useMutation} from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom';
import {UPDATE_USER,CREATE_USER} from '../../../shared/graphql/user.gql'

interface UserFormProps {
   mode: string,
   data?: any,
}

const UserForm: React.FC<UserFormProps>= (props) => {
    const{mode,data} = props
    const areFieldsRequired = mode === 'CREATE' ? true : false 
    
    const history =useHistory()

    const initialValues = mode === 'CREATE' ? 
        { firstName: '', lastName: '', username: '', role: null, password : ''}:
        { firstName: data.firstName, lastName: data.lastName, username: data.username, role: data.role}
    

    const mutationUsed = mode === 'CREATE' ? CREATE_USER : UPDATE_USER

    const [mutate] = useMutation(mutationUsed)
    const onFinish = (values: any) => { 
        delete values.confirm
        const variables = mode === 'CREATE' ? {userInput: values} : {id: data._id, updateInput: values}
        mutate({variables: variables})
        .then(()=>{
            history.push('/admin/users')
        }).catch(e=>{
            console.log('the error is',e)
        })
    }

    const [userNameType, setUserNameType] = useState('email')
    
    return (
        <Form
        initialValues={initialValues}
        name={mode === 'CREATE' ? 'Create-user' : 'Edit-user'}
        onFinish={onFinish} >
            <Card  
                extra={
                <Space size="small">
                    { mode === 'EDIT' &&
                    <Button onClick={()=>history.push('/admin/users')}>cancel</Button>
                    }
                    <Button 
                    icon={<SaveOutlined translate/>} 
                    type="primary" htmlType="submit">{mode === 'CREATE' ? 'Create' : 'Save'}</Button>
                </Space>
                }
                title={mode === 'CREATE' ? 'Create a user' : 'Edit user'}>

                <Row gutter={24}>
                    <Col xs={24} lg={12}>
                    <Form.Item label="First name" rules={[{ required: areFieldsRequired, message: 'Please provide a first name!' }]} name="firstName">
                        <Input placeholder="first name" />
                    </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                    <Form.Item label="Last name" rules={[{ required: areFieldsRequired, message: 'Please provide a last name!' }]} name="lastName">
                        <Input placeholder="last name" />
                    </Form.Item>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col xs={24} lg={12}>
                        <Row>
                            <Col xs={12} sm={18}>
                                <Form.Item label="User name" rules={[{ required: areFieldsRequired, message: 'Please provide a user name!' }]} name="username">
                                    <Input 
                                    placeholder={`Provide a valid ${userNameType === 'email' ? 'email' : 'Phone number'}`} 
                                    type={userNameType}
                                    suffix={
                                        <Tooltip title="Provide a phone number or an email">
                                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} translate/>
                                        </Tooltip>
                                    }/>
                                </Form.Item>
                                </Col>
                                <Col xs={12} sm={6}>
                                <Button onClick={()=>setUserNameType(userNameType === 'email' ? 'number' : 'email')}>
                                    Use {userNameType === 'email' ? 'phone number' : 'email'}
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Form.Item
                            name="role"
                            label="Select role"
                            hasFeedback
                            rules={[{ required: areFieldsRequired, message: 'Please select a role!' }]}
                        >
                            <Select placeholder={"Select a role"}>
                                <Select.Option value="SUPER_ADMIN">SUPER_ADMIN</Select.Option>
                                <Select.Option value="ADMIN">ADMIN</Select.Option>
                                <Select.Option value="CUSTOMER">CUSTOMER</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                { mode === 'CREATE' && (
                <Row gutter={24}>
                    <Col xs={24} lg={12}>
                        <Form.Item label="Password"  rules={[{ required: areFieldsRequired, message: 'Please provide a password!' }]} name="password">
                            <Input.Password placeholder="passowrd"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                        ]}
                       >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>
                )
                }
          </Card>
        </Form>
        );
}
export default UserForm