import {Form, FormType} from "../../../shared/interfaces/form";

export const profileSettingForm: Form[] = [
    {
        name: "firstName",
        label: "First Name",
        type: FormType.TEXT
    },
    {
        name: "lastName",
        label: "Last Name",
        type: FormType.TEXT
    },
    {
        name: "username",
        label: "Username",
        type: FormType.TEXT
    },
];

// password form

// profile picture form