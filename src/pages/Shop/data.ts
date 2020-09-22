import { Form, FormType } from '../../shared/interfaces/form';
const uuidv1 = require('uuid/v1');
export const shopColumns = [
    {
        key: uuidv1(),
        title: "ID",
        dataIndex: "id"
    },
    {
        key: uuidv1(),
        title: "Branch Name",
        dataIndex: "branchName"
    },
    {
        key: uuidv1(),
        title: "Admin",
        dataIndex: "admin",
        render: (value: any) => `${value.firstName} ${value.lastName}`
    },
];


export const shopForm: Form[] = [
    {
        name: "branchName",
        label: "Branch Name",
        type: FormType.TEXT,
    },
    {
        name: "admin",
        label: "Admin",
        type: FormType.SELECT
    },
];