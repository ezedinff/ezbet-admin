import React, { useState } from 'react'

import {Form, Card, Button,Row, Col, Select, Input,Statistic, Divider} from 'antd'
import {useMutation} from '@apollo/react-hooks'
import {useHistory} from 'react-router-dom'

import {MAKE_TRANSACTION} from '../../../../shared/graphql/transaction.gql'

const TransactionForm = (props: any) => {
    const {type, customers} = props
    const [makeTransaction] = useMutation(MAKE_TRANSACTION)

    const [currentBalance, setCurrentBalance] = useState('N/A')
    
    const checkTransactionValidity = (amount:any) => {
       if(amount < 0) return false
       if(type === 'DEPOSIT' || !amount) return true
       if(type === 'WITHDRAW'){
           return parseFloat(currentBalance) - amount > 0
       }
       
    }

    const[form] =Form.useForm()
    const onCustomerChange = (id:any) => {
       form.setFieldsValue({customer: id})
       const customer = customers.filter((c:any)=>c._id === id)
       if(customer.length){
            setCurrentBalance(customer[0].accountBalance)
       }
    }

    const history = useHistory()
    const onFinish = (values:any) => {
        const transaction = {customer: values.customer,amount:parseFloat(values.amount), type: type}
        makeTransaction({variables: {transaction}})
        .then((data)=>{
            history.push("/admin/transactions")
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    const {Option} = Select
    return(
        <Form
            form={form}
            name={`Make ${type}`}
            onFinish={onFinish} >
            <Card  
                extra={<Button type="primary" htmlType="submit">
                        {type === 'DEPOSIT' ? 'Deposit' : 'Withdraw'} 
                      </Button>}
                title={type === 'DEPOSIT' ? 'Deposit' : 'Withdrawal'} 
            >
                    <Row gutter={24} style={{paddingLeft : '30px'}}>
                        <Col style={{backgroundColor : '#f5f5f5' ,padding: '20px',  marginRight:'20px',borderRadius: '4px'}}>
                            <Statistic title="Balance" value={currentBalance} precision={2} suffix={currentBalance !== 'N/A' && 'birr'}/>
                        </Col>
                    </Row>
                    
                    <Row gutter={24} style={{marginTop : '30px'}}>
                        <Col xs={24} lg={12}>
                            <Form.Item label="Customer" rules={[{required:true, message: 'Customer is required'}]} name="customer">
                                <Select 
                                    placeholder="Select a customer username" 
                                    showSearch 
                                    optionFilterProp="children"
                                    onChange={onCustomerChange}
                                    >
                                    {
                                        customers.map((customer:any)=>
                                          <Option key={customer._id} value={customer._id}>
                                            {`${customer.firstName} ${customer.lastName} (${customer.username})`}
                                          </Option>)
                                    }
                                  </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Form.Item 
                                label="Amount" 
                                name="amount"
                                dependencies={['customer']}
                                rules={[
                                    {required:true, message: 'Please provide an amount'},
                                    ({getFieldValue}) => ({
                                        validator(rule, value) {
                                        if(!getFieldValue('customer')){
                                            return Promise.reject('Please choose a customer first')
                                        }
                                        if (checkTransactionValidity(value)) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('This is not a valid value. Please change it.');
                                        },
                                    })
                                    ]}
                                >
                                 <Input type="number" placeholder="Enter amount"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    
            </Card>
        </Form>
    )
}
export default TransactionForm