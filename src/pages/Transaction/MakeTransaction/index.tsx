import React from 'react'

import {Tabs, Alert} from 'antd'
import {useQuery} from '@apollo/react-hooks'

import {FullPageLoader} from '../../../components/Loaders/FullPageLoader'
import TransactionForm from './TransactionForm'
import {USERS,CURRENT_USER} from '../../../shared/graphql/user.gql'

const MakeTransaction = () => {

    // choose between Withdrawal and deposit #
    // enter amount of transaction 
    // choose between users of type customer
    // - view available amount of user balance
    // - view amount that can be withdrawn
    // query who am i to get self id
    // submit from
    // if successful go to print ticket page of transaction
    //- this page could also be accessed by clicking on an element from the table


    const {loading: loadingCustomers, error: customersError, data: customersData} = useQuery(USERS,{variables :{role:'CUSTOMER'}})
    const {loading: loadingCurrentUser, error: currentUserError, data: currentUserData} = useQuery(CURRENT_USER)

    
    if(loadingCustomers || loadingCurrentUser) return <FullPageLoader/>
    if(customersError || currentUserError)console.log('error')
    

    const {TabPane} = Tabs
    return(
        <Tabs size="small" defaultActiveKey="1" type="card">
            <TabPane tab="Deposit" key="1">
                <TransactionForm type="DEPOSIT" customers={customersData.users} currentUser={currentUserData.whoami}/>
            </TabPane>
            <TabPane tab="Withdrawal" key="2">
                <TransactionForm type="WITHDRAW" customers={customersData.users} currentUser={currentUserData.whoami}/>
            </TabPane>
        </Tabs>
    )
}
export default MakeTransaction