import React, { useState, useRef } from 'react'
import {useQuery} from '@apollo/react-hooks'
import { Result, Button, Modal, Space } from 'antd';
import {PrinterTwoTone} from '@ant-design/icons'
import {FullPageLoader} from '../../components/Loaders/FullPageLoader'
import { DataTable } from '../../components/DataTable';
import PlaceTicket from './PlaceTicket'
import {TICKETS} from '../../shared/graphql/ticket.gql'
import {ticketColumns, ticketFilters} from './data'
import PrintTicket from './PrintTicket'
import { useReactToPrint } from 'react-to-print';

const uuidv1 = require('uuid/v1');

export const Ticket = () => {
    const [ticketToPlace, setTicketToPlace] = useState(null)
    const [ticketToPrint, setTicketToPrint] = useState(null)
  
    const componentRef:any = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });

    const {loading, data, error} = useQuery(TICKETS)
    if(loading){
        return <FullPageLoader/>
    }
    if(error){
        return <Result 
                status="500" title="500" 
                subTitle="Sorry, something went wrong."
                extra={<Button type="primary">Try reloading</Button>}/>
    }

    const actions = {
        title: "Actions",
        key: uuidv1(),
        render: (record: any) => {
            return (
                <Space>
                    <Button  onClick={()=>setTicketToPlace(record)} disabled={record.isPlaced} type="primary" >
                        {record.isPlaced ? 'Placed' : 'Place'}
                    </Button>
                    <Button onClick={()=>setTicketToPrint(record)}><PrinterTwoTone translate/></Button>
                </Space>
            )
        }
    }
   
    if(!ticketColumns.find(column => column.title === "Actions")) {
        ticketColumns.push(actions)
    }
    
  
  
    return (
    <>
    <PlaceTicket ticket={ticketToPlace} setTicket={setTicketToPlace}/>
    <Modal 
        visible={!!ticketToPrint} 
        onCancel={()=>setTicketToPrint(null)}
        footer={[
            <Button key="back" onClick={()=>setTicketToPrint(null)}>
              cancel
            </Button>,
            <Button key="print" type="primary" onClick={handlePrint}>
              Print
            </Button>,
          ]}
    >
        <PrintTicket ticket={ticketToPrint}  ref={componentRef}/>
    </Modal>
    <DataTable
            columns={ticketColumns}
            formElements={ticketFilters}
            data={data.tickets}
            title={"Tickets"} updateFn={() => {}}/>
    </>
    )
}