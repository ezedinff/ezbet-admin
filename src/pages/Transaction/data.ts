import { Form, FormType } from '../../shared/interfaces/form';
export const transactionColumns = [
    {
        title: "Customer",
        dataIndex: "customer"
    },
    {
        title: "Cashier",
        dataIndex: "cashier"
    },
    {
        title: "Shop",
        dataIndex: "shop"
    },
    {
        title: "Transaction Type",
        dataIndex: "type"
    },
    {
        title: "Amount in ETB",
        dataIndex: "amount"
    },
    {
        title: "Date",
        dataIndex: "date"
    }
]

export const transactionFilters: Form[] = [
    {
        label: "Customer Username",
        name: "customerUsername",
        type: FormType.TEXT
    },
    {
        label: "Cashier Username",
        name: "cashierUsername",
        type: FormType.TEXT
    },
    {
        label: "Transaction Type",
        name: "type",
        type: FormType.SELECT
    },
    {
        label: "Date Range",
        name: "range",
        type: FormType.DATE
    },
]