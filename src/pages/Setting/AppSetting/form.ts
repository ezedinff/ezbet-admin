import {Form, FormType} from "../../../shared/interfaces/form";

export const appSettingForm: Form[] = [
    {
        name: "appNAme",
        label: "App Name",
        type: FormType.TEXT
    },
    {
        name: "maxWin",
        label: "Maximum Win",
        type: FormType.NUMBER
    },
    {
        name: "maxStake",
        label: "Maximum Stake",
        type: FormType.NUMBER
    },
    {
        name: "minStake",
        label: "Minimum Stake",
        type: FormType.NUMBER
    },
    {
        name: "withdrawalLimit",
        label: "Withdrawal Limit",
        type: FormType.NUMBER
    },
    {
        name: "commissionRate",
        label: "Commission Rate",
        type: FormType.NUMBER
    },
    {
        name: "vatRate",
        label: "VAT Rate",
        type: FormType.NUMBER
    }
];