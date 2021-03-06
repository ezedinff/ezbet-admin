import { Form, FormType } from "../../shared/interfaces/form"

export const reportColumns = [
    {
        title: "Date",
        dataIndex: "date",
    },
    {
        title: "No of playes",
        dataIndex: "noPlayed"
    },
    {
        title: "Played Money",
        dataIndex: "playedMoney"
    },
    {
        title: "No of Winners",
        dataIndex: "noWinners"
    },
    {
        title: "Won Money",
        dataIndex: "wonMoney"
    },
    {
        title: "Balance",
        dataIndex: "balance"
    },
    {
        title: "15% Comission",
        dataIndex: "comission"
    }
]

export const reportFilterForm: Form[] = [
    {
        label: "Date",
        name: "range",
        type: FormType.DATE
    }
]