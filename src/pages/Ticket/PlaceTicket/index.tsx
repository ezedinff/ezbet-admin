import React,{useEffect, useState} from 'react'

import { Button, Modal, Form, Input } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import {useHistory} from 'react-router-dom'

import {UPDATE_TICKET} from '../../../shared/graphql/ticket.gql'

const PlaceTicket = (props:any) => {
    const {ticket, setTicket} = props

    const [form] = Form.useForm()
    const [isFormSubmitting,setFormSubmitting] = useState(false)
    const history = useHistory()
    const [mutate] = useMutation(UPDATE_TICKET)
    const onFinish = (values:any) => {
        setFormSubmitting(true)
        mutate({variables: {updateInput: {stake: parseFloat(values.stake)}, id: ticket._id}})
        .then(()=>{
            setFormSubmitting(false)
            console.log('placed')
        })
        .catch((e)=>{
            setFormSubmitting(false)
            console.log(e)
        })
    }

    useEffect(()=>{
        const stake = ticket ? ticket.stake : null
        form.setFieldsValue({stake:stake})
    },[ticket])

    return(
        <Modal
        visible={!!ticket}
        title="Place ticket"
        onCancel={()=>setTicket(null)}
        footer={[
          <Button key="back" onClick={()=>setTicket(null)}>
            cancel
          </Button>,
          <Button key="submit" type="primary" loading={isFormSubmitting}  onClick={()=>form.submit()}>
            Place
          </Button>,
        ]}
      >
          <Form
           form={form}
           onFinish={onFinish}
          >
              <Form.Item 
              label="Stake" 
              name="stake" 
              rules={[
                {required: true, message: 'Please enter a stake'}, 
                () => ({
                  validator(rule, value) {
                  if(value < 30){
                      return Promise.reject('Stake must be greater than 30')
                  }
                  return Promise.resolve();
                  },
              })
                ]}
            >
                  <Input type="number"/>
              </Form.Item>
          </Form>
        </Modal>
    )
}
export default PlaceTicket