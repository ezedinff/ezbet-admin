import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { TRANSACTIONS } from '../../shared/graphql/transaction.gql';
import {useHistory} from 'react-router-dom'
import { FullPageLoader } from '../../components/Loaders/FullPageLoader';
import { DataTable } from '../../components/DataTable';
import { transactionColumns, transactionFilters } from './data';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
export const Transaction = () => {
    const history = useHistory()
    const [getTransactions, {data: transactions, loading, error}] = useLazyQuery(TRANSACTIONS,{fetchPolicy:'network-only'});
    useEffect(() => {
        getTransactions();
    }, [])
    const updateFilter = (values: any) => {
        let data = {...values,
             type: values.type === "ALL" ? undefined : values.type,
            };
            if(values.range.length === 2){
                    data['from'] = values.range[0].format()
                    data['to'] = values.range[1].format()
            }
            console.log(data)
        delete data.range;
        getTransactions({
            variables: data
        });
    }
    console.log(transactions)
    return loading || !transactions
     ? <FullPageLoader/>
     : (
         <DataTable
         columns ={transactionColumns}
         formElements={transactionFilters}
         onSubmit={updateFilter}
         extras = {<Button icon={<PlusOutlined translate/>} onClick={() =>history.push('/admin/maketransaction')}>Create Transaction</Button>}
         formData={{
             intialValues: {type: "ALL"},
             selectValues: {
                 type: [
                     {label: "All", value: "ALL"},
                     {label: "Deposit", value: "DEPOSIT"},
                     {label: "Withdraw", value: "WITHDRAW"},

                 ]
             }
         }}
         data={transactions.transactions}
         title={"Transactions"}
         updateFn={() => {}}
         />
     )
};